-- Try Agent hardening: fixes progress-tracking schema drift and adds the
-- columns/indexes/RPCs needed for multi-signal abuse protection.
-- Idempotent: safe to run multiple times and safe against production rows
-- created by the original 20260821_try_agent_foundation.sql migration.

-- ---------------------------------------------------------------------------
-- 1. agent_requests: guarantee `progress` is decimal-compatible.
--
-- The tracked migration declares `progress double precision`, but if the
-- live table ever drifted to an integer type (e.g. via a manual dashboard
-- edit), every fractional write from the crawler would silently round to 0
-- or 1 — which reproduces exactly the "stuck at 0% until ready" symptom.
-- ALTER COLUMN TYPE to the same type is a harmless no-op, so this is safe to
-- run unconditionally and preserves all existing values via the USING cast.
-- ---------------------------------------------------------------------------
alter table public.agent_requests
  alter column progress type double precision using progress::double precision;

alter table public.agent_requests
  alter column progress set default 0.05;

-- ---------------------------------------------------------------------------
-- 2. updated_at bookkeeping (agent_requests + agent_conversations)
-- ---------------------------------------------------------------------------
alter table public.agent_requests
  add column if not exists updated_at timestamptz not null default now();

update public.agent_requests set updated_at = created_at where updated_at is null;

create or replace function public.try_agent_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists try_agent_requests_touch_updated_at on public.agent_requests;
create trigger try_agent_requests_touch_updated_at
  before update on public.agent_requests
  for each row execute function public.try_agent_touch_updated_at();

alter table public.agent_conversations
  add column if not exists updated_at timestamptz not null default now();

drop trigger if exists try_agent_conversations_touch_updated_at on public.agent_conversations;
create trigger try_agent_conversations_touch_updated_at
  before update on public.agent_conversations
  for each row execute function public.try_agent_touch_updated_at();

-- ---------------------------------------------------------------------------
-- 3. agent_requests: identity signals for multi-factor abuse protection.
-- All nullable so existing rows remain valid without a backfill.
-- ---------------------------------------------------------------------------
alter table public.agent_requests add column if not exists normalized_email text;
alter table public.agent_requests add column if not exists normalized_hostname text;
alter table public.agent_requests add column if not exists browser_hash text;
alter table public.agent_requests add column if not exists ip_hash text;
alter table public.agent_requests add column if not exists access_token_hash text;

create index if not exists agent_requests_created_at_idx
  on public.agent_requests (created_at desc);
create index if not exists agent_requests_normalized_email_created_at_idx
  on public.agent_requests (normalized_email, created_at desc);
create index if not exists agent_requests_normalized_hostname_created_at_idx
  on public.agent_requests (normalized_hostname, created_at desc);
create index if not exists agent_requests_browser_hash_created_at_idx
  on public.agent_requests (browser_hash, created_at desc);
create index if not exists agent_requests_ip_hash_created_at_idx
  on public.agent_requests (ip_hash, created_at desc);

-- ---------------------------------------------------------------------------
-- 4. agent_conversations: support "reserve row before paid work" so the
--    10-question quota can't be beaten by parallel requests.
-- ---------------------------------------------------------------------------
alter table public.agent_conversations alter column answer drop not null;
alter table public.agent_conversations
  add column if not exists status text not null default 'answered';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'agent_conversations_status_check'
  ) then
    alter table public.agent_conversations
      add constraint agent_conversations_status_check
      check (status in ('reserved', 'answered', 'failed'));
  end if;
end;
$$;

-- ---------------------------------------------------------------------------
-- 5. Atomic creation-quota check + insert.
--
-- All limit checks and the insert happen inside one function invocation,
-- which Postgres runs as a single transaction. A global advisory xact lock
-- (auto-released at transaction end/rollback) serializes concurrent calls to
-- this function so two simultaneous submissions can never both pass the
-- count check before either has inserted — closing the count-then-insert
-- race. Given this endpoint's expected volume (a marketing demo form, not a
-- high-throughput API), a single global lock is simpler to reason about than
-- per-identity locks and has no meaningful throughput cost.
-- ---------------------------------------------------------------------------
create or replace function public.try_agent_create_request(
  p_id uuid,
  p_name text,
  p_email text,
  p_company_name text,
  p_company_site text,
  p_normalized_email text,
  p_normalized_hostname text,
  p_browser_hash text,
  p_ip_hash text,
  p_access_token_hash text,
  p_email_limit integer,
  p_browser_limit integer,
  p_domain_limit integer,
  p_ip_limit integer,
  p_global_limit integer,
  p_window_hours integer
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, pg_temp
as $$
declare
  v_window_start timestamptz := now() - (p_window_hours || ' hours')::interval;
  v_count integer;
  v_oldest timestamptz;
begin
  perform pg_advisory_xact_lock(hashtext('try_agent_create_request'));

  if p_normalized_email is not null then
    select count(*), min(created_at) into v_count, v_oldest
      from public.agent_requests
      where normalized_email = p_normalized_email and created_at >= v_window_start;
    if v_count >= p_email_limit then
      return jsonb_build_object(
        'accepted', false, 'limit_type', 'email',
        'retry_at', v_oldest + (p_window_hours || ' hours')::interval);
    end if;
  end if;

  if p_browser_hash is not null then
    select count(*), min(created_at) into v_count, v_oldest
      from public.agent_requests
      where browser_hash = p_browser_hash and created_at >= v_window_start;
    if v_count >= p_browser_limit then
      return jsonb_build_object(
        'accepted', false, 'limit_type', 'browser',
        'retry_at', v_oldest + (p_window_hours || ' hours')::interval);
    end if;
  end if;

  if p_normalized_hostname is not null then
    select count(*), min(created_at) into v_count, v_oldest
      from public.agent_requests
      where normalized_hostname = p_normalized_hostname and created_at >= v_window_start;
    if v_count >= p_domain_limit then
      return jsonb_build_object(
        'accepted', false, 'limit_type', 'domain',
        'retry_at', v_oldest + (p_window_hours || ' hours')::interval);
    end if;
  end if;

  if p_ip_hash is not null then
    select count(*), min(created_at) into v_count, v_oldest
      from public.agent_requests
      where ip_hash = p_ip_hash and created_at >= v_window_start;
    if v_count >= p_ip_limit then
      return jsonb_build_object(
        'accepted', false, 'limit_type', 'ip',
        'retry_at', v_oldest + (p_window_hours || ' hours')::interval);
    end if;
  end if;

  select count(*) into v_count
    from public.agent_requests
    where created_at >= v_window_start;
  if v_count >= p_global_limit then
    return jsonb_build_object(
      'accepted', false, 'limit_type', 'global',
      'retry_at', v_window_start + (p_window_hours || ' hours')::interval);
  end if;

  insert into public.agent_requests (
    id, name, email, company_name, company_site,
    normalized_email, normalized_hostname, browser_hash, ip_hash, access_token_hash,
    status, progress, created_at, updated_at
  ) values (
    p_id, p_name, p_email, p_company_name, p_company_site,
    p_normalized_email, p_normalized_hostname, p_browser_hash, p_ip_hash, p_access_token_hash,
    'pending', 0.05, now(), now()
  );

  return jsonb_build_object('accepted', true, 'limit_type', null, 'retry_at', null);
end;
$$;

revoke all on function public.try_agent_create_request(
  uuid, text, text, text, text, text, text, text, text, text,
  integer, integer, integer, integer, integer, integer
) from public, anon, authenticated;
grant execute on function public.try_agent_create_request(
  uuid, text, text, text, text, text, text, text, text, text,
  integer, integer, integer, integer, integer, integer
) to service_role;

-- ---------------------------------------------------------------------------
-- 6. Atomic question-quota reservation.
--
-- Reserves the conversation row (answer = null, status = 'reserved') inside
-- the same locked transaction that checks the rolling 24h count, before any
-- OpenAI call is made — so parallel requests can't both observe "9 used" and
-- both proceed. The lock key is scoped per request id so unrelated agents
-- don't serialize against each other.
-- ---------------------------------------------------------------------------
create or replace function public.try_agent_reserve_question(
  p_request_id uuid,
  p_question text,
  p_query_limit integer,
  p_window_hours integer
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, pg_temp
as $$
declare
  v_window_start timestamptz := now() - (p_window_hours || ' hours')::interval;
  v_count integer;
  v_oldest timestamptz;
  v_conversation_id bigint;
begin
  perform pg_advisory_xact_lock(hashtext('try_agent_reserve_question:' || p_request_id::text));

  select count(*), min(created_at) into v_count, v_oldest
    from public.agent_conversations
    where user_request_id = p_request_id and created_at >= v_window_start;

  if v_count >= p_query_limit then
    return jsonb_build_object(
      'accepted', false, 'limit_type', 'query', 'conversation_id', null,
      'retry_at', v_oldest + (p_window_hours || ' hours')::interval);
  end if;

  insert into public.agent_conversations (user_request_id, question, answer, status, created_at)
  values (p_request_id, p_question, null, 'reserved', now())
  returning id into v_conversation_id;

  return jsonb_build_object(
    'accepted', true, 'limit_type', null, 'retry_at', null,
    'conversation_id', v_conversation_id, 'used_count', v_count);
end;
$$;

revoke all on function public.try_agent_reserve_question(uuid, text, integer, integer)
  from public, anon, authenticated;
grant execute on function public.try_agent_reserve_question(uuid, text, integer, integer) to service_role;
