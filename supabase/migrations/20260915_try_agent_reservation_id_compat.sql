-- Fixes a production failure in try_agent_reserve_question:
--   invalid input syntax for type bigint: "28512f23-9bc6-4ae1-aa1b-bb186a885571"
--
-- Root cause: the live public.agent_conversations.id column is uuid, but
-- 20260914_try_agent_hardening.sql declared v_conversation_id as bigint
-- (matching the *tracked* schema from 20260821_try_agent_foundation.sql,
-- which never actually matched the live column). Assigning a uuid returned
-- by `returning id into v_conversation_id` into a bigint variable fails.
--
-- This migration does not edit 20260914_try_agent_hardening.sql — it
-- recreates the same function with the id captured as text instead, which
-- is safe to assign from either a uuid or a bigint id column and requires
-- no numeric parsing downstream. Idempotent: safe to run multiple times.

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
  v_conversation_id text;
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
  returning id::text into v_conversation_id;

  return jsonb_build_object(
    'accepted', true, 'limit_type', null, 'retry_at', null,
    'conversation_id', v_conversation_id, 'used_count', v_count);
end;
$$;

revoke all on function public.try_agent_reserve_question(uuid, text, integer, integer)
  from public, anon, authenticated;
grant execute on function public.try_agent_reserve_question(uuid, text, integer, integer) to service_role;
