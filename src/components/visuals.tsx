/**
 * RenoMeta abstract technical visuals.
 * Minimal SVG line art with subtle gold accent and slow motion.
 * Reusable across homepage feature cards, inner page heroes, and blog cards.
 */
import { type ReactNode, type ReactElement } from "react";

type Tone = "light" | "dark";
type Size = "sm" | "md" | "lg";

interface VisualProps {
  tone?: Tone;
  size?: Size;
  className?: string;
}

const sizeClass: Record<Size, string> = {
  sm: "aspect-[16/9]",
  md: "aspect-[16/9]",
  lg: "aspect-[16/8]",
};

function Frame({
  tone = "light",
  size = "md",
  className = "",
  children,
}: VisualProps & { children: ReactNode }) {
  const bg =
    tone === "dark"
      ? "bg-[oklch(0.20_0.01_80)] border-[oklch(0.28_0.01_80)]"
      : "bg-gradient-to-br from-gold-soft/40 via-surface to-background border-border";
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border ${bg} ${sizeClass[size]} ${className}`}
    >
      <div className="absolute inset-0 bg-grid-fade opacity-40 pointer-events-none" />
      {children}
    </div>
  );
}

/* Shared SVG palette */
const GOLD = "#d9ab57";
const STROKE_LIGHT = "rgba(20,20,22,0.55)";
const STROKE_DARK = "rgba(230,225,215,0.45)";
const FAINT_LIGHT = "rgba(20,20,22,0.22)";
const FAINT_DARK = "rgba(230,225,215,0.20)";

function strokes(tone: Tone) {
  return {
    main: tone === "dark" ? STROKE_DARK : STROKE_LIGHT,
    faint: tone === "dark" ? FAINT_DARK : FAINT_LIGHT,
  };
}

/* ------------ 1. Agent Network — orbiting AI core ------------ */
export function AgentNetworkVisual({ tone = "light", size = "md", className }: VisualProps) {
  const { main, faint } = strokes(tone);
  const cx = 250;
  const cy = 150;
  const agents = [
    { label: "QUALIFY", r: 70, angle: -30 },
    { label: "FOLLOW-UP", r: 70, angle: 60 },
    { label: "ESTIMATE", r: 70, angle: 150 },
    { label: "REVIEW", r: 70, angle: 220 },
    { label: "TRIAGE", r: 105, angle: 10 },
    { label: "SUMMARY", r: 105, angle: 110 },
    { label: "INSIGHTS", r: 105, angle: 200 },
    { label: "TASKS", r: 105, angle: 300 },
  ];
  return (
    <Frame tone={tone} size={size} className={className}>
      <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full">
        {/* radial scan lines */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 12;
          return (
            <line
              key={i}
              x1={cx + Math.cos(a) * 40}
              y1={cy + Math.sin(a) * 40}
              x2={cx + Math.cos(a) * 130}
              y2={cy + Math.sin(a) * 130}
              stroke={faint}
              strokeWidth={0.5}
            />
          );
        })}
        {/* orbital rings */}
        {[50, 70, 105, 130].map((r, i) => (
          <circle
            key={r}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={i === 1 || i === 2 ? main : faint}
            strokeWidth={0.6}
            strokeDasharray={i % 2 === 0 ? "2 4" : undefined}
            opacity={i === 1 || i === 2 ? 0.55 : 0.9}
          />
        ))}
        {/* rotating outer ring group with tick marks */}
        <g style={{ transformOrigin: `${cx}px ${cy}px` }}>
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i * Math.PI * 2) / 24;
            const x1 = cx + Math.cos(a) * 128;
            const y1 = cy + Math.sin(a) * 128;
            const x2 = cx + Math.cos(a) * 134;
            const y2 = cy + Math.sin(a) * 134;
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={main} strokeWidth={0.5} opacity={i % 6 === 0 ? 0.9 : 0.35} />
            );
          })}
          <animateTransform attributeName="transform" type="rotate"
            from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="60s" repeatCount="indefinite" />
        </g>
        {/* core */}
        <circle cx={cx} cy={cy} r={26} fill="none" stroke={GOLD} strokeWidth={1} />
        <circle cx={cx} cy={cy} r={26} fill={GOLD} opacity={0.08} />
        <circle cx={cx} cy={cy} r={4} fill={GOLD}>
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <text x={cx} y={cy + 3} fontSize="8" fill={main} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="1.5">
          AI CORE
        </text>
        {/* expanding pulse */}
        <circle cx={cx} cy={cy} r={26} fill="none" stroke={GOLD} strokeWidth={0.75}>
          <animate attributeName="r" values="26;110;26" dur="6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0;0.6" dur="6s" repeatCount="indefinite" />
        </circle>
        {/* agent nodes */}
        {agents.map((a, i) => {
          const rad = (a.angle * Math.PI) / 180;
          const x = cx + Math.cos(rad) * a.r;
          const y = cy + Math.sin(rad) * a.r;
          const isInner = a.r === 70;
          return (
            <g key={a.label}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke={faint} strokeWidth={0.5} />
              <circle cx={x} cy={y} r={isInner ? 6 : 4.5} fill="none"
                stroke={isInner ? GOLD : main}
                strokeWidth={isInner ? 1 : 0.75}
                opacity={isInner ? 0.95 : 0.7} />
              <circle cx={x} cy={y} r={1.6} fill={isInner ? GOLD : main}>
                <animate attributeName="opacity" values="0.3;1;0.3"
                  dur={`${3 + (i % 3)}s`} begin={`${i * 0.3}s`} repeatCount="indefinite" />
              </circle>
              <text
                x={x + (Math.cos(rad) >= 0 ? 11 : -11)}
                y={y + 3}
                fontSize="6.5"
                fill={main}
                textAnchor={Math.cos(rad) >= 0 ? "start" : "end"}
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.5"
                opacity={0.7}
              >
                {a.label}
              </text>
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}


/* ------------ 2. Unified Inbox ------------ */
export function UnifiedInboxVisual({ tone = "light", size = "md", className }: VisualProps) {
  const { main, faint } = strokes(tone);
  const channels = ["SMS", "WhatsApp", "Messenger", "Instagram", "Voice"];
  const startX = 40;
  const endX = 380;
  const centerY = 150;
  return (
    <Frame tone={tone} size={size} className={className}>
      <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full">
        {channels.map((c, i) => {
          const y = 50 + i * 50;
          const cx = 100;
          return (
            <g key={c}>
              <text x={startX} y={y - 8} fontSize="9" fill={main} fontFamily="ui-monospace, monospace" letterSpacing="1">
                {c.toUpperCase()}
              </text>
              <circle cx={cx} cy={y} r={3} fill={GOLD} />
              <path
                d={`M ${cx} ${y} C 200 ${y}, 260 ${centerY}, ${endX} ${centerY}`}
                stroke={main} strokeWidth={0.75} fill="none"
              />
              <circle r={2} fill={GOLD}>
                <animateMotion
                  dur={`${5 + i}s`}
                  begin={`${i * 0.6}s`}
                  repeatCount="indefinite"
                  path={`M ${cx} ${y} C 200 ${y}, 260 ${centerY}, ${endX} ${centerY}`}
                />
              </circle>
            </g>
          );
        })}
        <rect x={endX - 8} y={centerY - 22} width={70} height={44} rx={8}
          fill="none" stroke={GOLD} strokeWidth={1} />
        <rect x={endX - 8} y={centerY - 22} width={70} height={44} rx={8}
          fill={GOLD} opacity={0.06} />
        <text x={endX + 27} y={centerY + 3} fontSize="9" fill={main} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="1">
          INBOX
        </text>
        <line x1={endX - 2} y1={centerY - 12} x2={endX + 60} y2={centerY - 12} stroke={faint} strokeWidth={0.5} />
        <line x1={endX - 2} y1={centerY} x2={endX + 60} y2={centerY} stroke={faint} strokeWidth={0.5} />
        <line x1={endX - 2} y1={centerY + 12} x2={endX + 60} y2={centerY + 12} stroke={faint} strokeWidth={0.5} />
      </svg>
    </Frame>
  );
}

/* ------------ 3. Pipeline Stack ------------ */
export function PipelineStackVisual({ tone = "light", size = "md", className }: VisualProps) {
  const { main, faint } = strokes(tone);
  const stages = ["Lead", "Qualified", "Estimate", "Won"];
  return (
    <Frame tone={tone} size={size} className={className}>
      <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full">
        {stages.map((s, i) => {
          const x = 30 + i * 115;
          return (
            <g key={s}>
              <rect x={x} y={70} width={100} height={160} rx={10}
                fill="none" stroke={faint} strokeWidth={0.75} />
              <text x={x + 10} y={90} fontSize="9" fill={main} fontFamily="ui-monospace, monospace" letterSpacing="1">
                {s.toUpperCase()}
              </text>
              <line x1={x + 10} y1={100} x2={x + 90} y2={100} stroke={faint} strokeWidth={0.5} />
              {[0, 1, 2].map((k) => {
                const cy = 118 + k * 34;
                const highlight = (i + k) % 3 === 0;
                return (
                  <g key={k}>
                    <rect x={x + 10} y={cy} width={80} height={26} rx={5}
                      fill="none" stroke={highlight ? GOLD : main} strokeWidth={0.75}
                      opacity={highlight ? 0.9 : 0.55} />
                    <line x1={x + 16} y1={cy + 9} x2={x + 60} y2={cy + 9} stroke={main} strokeWidth={0.5} opacity={0.6} />
                    <line x1={x + 16} y1={cy + 16} x2={x + 48} y2={cy + 16} stroke={main} strokeWidth={0.5} opacity={0.35} />
                    {highlight && (
                      <circle cx={x + 84} cy={cy + 13} r={1.8} fill={GOLD}>
                        <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin={`${(i + k) * 0.4}s`} repeatCount="indefinite" />
                      </circle>
                    )}
                  </g>
                );
              })}
              {i < stages.length - 1 && (
                <>
                  <line x1={x + 100} y1={150} x2={x + 115} y2={150} stroke={main} strokeWidth={0.75} />
                  <circle r={2} fill={GOLD}>
                    <animate attributeName="cx" values={`${x + 100};${x + 115}`} dur="4s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
                    <animate attributeName="cy" values="150;150" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;0" dur="4s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
                  </circle>
                </>
              )}
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

/* ------------ 4. Automation Flow ------------ */
export function AutomationFlowVisual({ tone = "light", size = "md", className }: VisualProps) {
  const { main, faint } = strokes(tone);
  return (
    <Frame tone={tone} size={size} className={className}>
      <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full">
        {/* trigger */}
        <g>
          <rect x={30} y={130} width={90} height={40} rx={8} fill="none" stroke={GOLD} strokeWidth={1} />
          <rect x={30} y={130} width={90} height={40} rx={8} fill={GOLD} opacity={0.06} />
          <text x={75} y={155} fontSize="9" fill={main} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="1">
            TRIGGER
          </text>
        </g>
        {/* connector to split */}
        <path d="M 120 150 L 180 150" stroke={main} strokeWidth={0.75} fill="none" />
        {/* branch lines */}
        <path d="M 180 150 C 210 150, 220 70, 270 70" stroke={main} strokeWidth={0.75} fill="none" />
        <path d="M 180 150 L 270 150" stroke={main} strokeWidth={0.75} fill="none" />
        <path d="M 180 150 C 210 150, 220 230, 270 230" stroke={main} strokeWidth={0.75} fill="none" />
        <circle cx={180} cy={150} r={3} fill={GOLD} />
        {/* actions */}
        {[70, 150, 230].map((y, i) => (
          <g key={y}>
            <rect x={270} y={y - 20} width={90} height={40} rx={8} fill="none" stroke={main} strokeWidth={0.75} />
            <text x={315} y={y + 3} fontSize="9" fill={main} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="1">
              {["SMS", "EMAIL", "TASK"][i]}
            </text>
            <path d={`M 360 ${y} L 420 ${y}`} stroke={faint} strokeWidth={0.75} fill="none" />
            <circle cx={425} cy={y} r={5} fill="none" stroke={i === 1 ? GOLD : main} strokeWidth={0.75} />
            <circle cx={425} cy={y} r={2} fill={i === 1 ? GOLD : main}>
              <animate attributeName="opacity" values="0.3;1;0.3" dur={`${3 + i}s`} begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
        {/* pulse along middle path */}
        <circle r={2.5} fill={GOLD}>
          <animateMotion dur="4s" repeatCount="indefinite"
            path="M 120 150 L 180 150 L 270 150" />
        </circle>
      </svg>
    </Frame>
  );
}

/* ------------ 5. Operations Blocks ------------ */
export function OperationsBlocksVisual({ tone = "light", size = "md", className }: VisualProps) {
  const { main, faint } = strokes(tone);
  const blocks = [
    { x: 60, y: 60, label: "SCHEDULE" },
    { x: 200, y: 60, label: "DISPATCH" },
    { x: 340, y: 60, label: "COSTING" },
    { x: 60, y: 180, label: "JOBS" },
    { x: 200, y: 180, label: "CREW" },
    { x: 340, y: 180, label: "WORKFLOW" },
  ];
  return (
    <Frame tone={tone} size={size} className={className}>
      <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full">
        {/* connecting lines */}
        {[
          "M 110 90 L 200 90", "M 250 90 L 340 90",
          "M 110 210 L 200 210", "M 250 210 L 340 210",
          "M 85 110 L 85 180", "M 225 110 L 225 180", "M 365 110 L 365 180",
        ].map((d, i) => (
          <path key={i} d={d} stroke={faint} strokeWidth={0.75} fill="none" strokeDasharray="3 3" />
        ))}
        {blocks.map((b, i) => (
          <g key={b.label}>
            {/* 3d block */}
            <path d={`M ${b.x} ${b.y} L ${b.x + 90} ${b.y} L ${b.x + 100} ${b.y - 10} L ${b.x + 10} ${b.y - 10} Z`}
              fill="none" stroke={faint} strokeWidth={0.75} />
            <path d={`M ${b.x + 90} ${b.y} L ${b.x + 100} ${b.y - 10} L ${b.x + 100} ${b.y + 40} L ${b.x + 90} ${b.y + 50} Z`}
              fill="none" stroke={faint} strokeWidth={0.75} />
            <rect x={b.x} y={b.y} width={90} height={50} rx={2}
              fill="none" stroke={i === 1 || i === 4 ? GOLD : main}
              strokeWidth={i === 1 || i === 4 ? 1 : 0.75}
              opacity={i === 1 || i === 4 ? 0.9 : 0.7} />
            <text x={b.x + 45} y={b.y + 30} fontSize="9" fill={main} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="1">
              {b.label}
            </text>
            {(i === 1 || i === 4) && (
              <circle cx={b.x + 82} cy={b.y + 8} r={1.8} fill={GOLD}>
                <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
              </circle>
            )}
          </g>
        ))}
      </svg>
    </Frame>
  );
}

/* ------------ 6. Insights Wave ------------ */
export function InsightsWaveVisual({ tone = "light", size = "md", className }: VisualProps) {
  const { main, faint } = strokes(tone);
  return (
    <Frame tone={tone} size={size} className={className}>
      <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full">
        {/* grid */}
        {[60, 110, 160, 210, 260].map((y) => (
          <line key={y} x1={30} y1={y} x2={470} y2={y} stroke={faint} strokeWidth={0.5} />
        ))}
        {[30, 140, 250, 360, 470].map((x) => (
          <line key={x} x1={x} y1={40} x2={x} y2={270} stroke={faint} strokeWidth={0.5} />
        ))}
        {/* faint baseline curve */}
        <path
          d="M 30 220 C 100 180, 160 200, 220 160 S 340 120, 400 130 S 470 90, 470 90"
          stroke={main} strokeWidth={0.75} fill="none" opacity={0.6}
        />
        {/* primary gold curve */}
        <path
          d="M 30 240 C 100 200, 160 210, 220 150 S 340 80, 400 100 S 470 60, 470 60"
          stroke={GOLD} strokeWidth={1.25} fill="none"
          strokeDasharray="600" strokeDashoffset="600"
        >
          <animate attributeName="stroke-dashoffset" from="600" to="0" dur="4s" fill="freeze" />
        </path>
        {/* bars */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const x = 60 + i * 50;
          const h = 20 + ((i * 37) % 60);
          return (
            <rect key={i} x={x} y={260 - h} width={10} height={h} rx={1}
              fill={i === 4 ? GOLD : main} opacity={i === 4 ? 0.9 : 0.35}>
              <animate attributeName="height" from="0" to={h} dur="1.2s" begin={`${i * 0.08}s`} fill="freeze" />
              <animate attributeName="y" from={260} to={260 - h} dur="1.2s" begin={`${i * 0.08}s`} fill="freeze" />
            </rect>
          );
        })}
        {/* moving dot */}
        <circle r={3} fill={GOLD}>
          <animateMotion dur="8s" repeatCount="indefinite"
            path="M 30 240 C 100 200, 160 210, 220 150 S 340 80, 400 100 S 470 60, 470 60" />
        </circle>
      </svg>
    </Frame>
  );
}

/* ------------ 7. Website → CRM ------------ */
export function WebsiteToCrmVisual({ tone = "light", size = "md", className }: VisualProps) {
  const { main, faint } = strokes(tone);
  return (
    <Frame tone={tone} size={size} className={className}>
      <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full">
        {/* website window */}
        <g>
          <rect x={30} y={60} width={180} height={180} rx={10} fill="none" stroke={main} strokeWidth={0.75} />
          <line x1={30} y1={82} x2={210} y2={82} stroke={faint} strokeWidth={0.5} />
          <circle cx={42} cy={71} r={2} fill={main} opacity={0.5} />
          <circle cx={50} cy={71} r={2} fill={main} opacity={0.5} />
          <circle cx={58} cy={71} r={2} fill={main} opacity={0.5} />
          <text x={40} y={102} fontSize="8" fill={main} fontFamily="ui-monospace, monospace" letterSpacing="1">
            /CONTACT
          </text>
          <rect x={40} y={115} width={160} height={10} rx={2} fill={faint} />
          <rect x={40} y={132} width={120} height={10} rx={2} fill={faint} />
          <rect x={40} y={150} width={160} height={30} rx={4} fill="none" stroke={faint} strokeWidth={0.5} />
          <rect x={40} y={195} width={70} height={22} rx={4} fill={GOLD} opacity={0.15} stroke={GOLD} strokeWidth={0.75} />
          <text x={75} y={210} fontSize="8" fill={main} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="1">
            SUBMIT
          </text>
        </g>
        {/* connection */}
        <path d="M 210 170 C 250 170, 260 150, 300 150" stroke={main} strokeWidth={0.75} fill="none" strokeDasharray="3 3" />
        {/* data packets */}
        {[0, 1, 2].map((i) => (
          <circle key={i} r={2.5} fill={GOLD}>
            <animateMotion dur="3s" begin={`${i * 1}s`} repeatCount="indefinite"
              path="M 210 170 C 250 170, 260 150, 300 150" />
            <animate attributeName="opacity" values="0;1;1;0" dur="3s" begin={`${i * 1}s`} repeatCount="indefinite" />
          </circle>
        ))}
        {/* CRM card */}
        <g>
          <rect x={300} y={80} width={170} height={140} rx={10} fill="none" stroke={GOLD} strokeWidth={1} />
          <rect x={300} y={80} width={170} height={140} rx={10} fill={GOLD} opacity={0.05} />
          <text x={315} y={100} fontSize="8" fill={main} fontFamily="ui-monospace, monospace" letterSpacing="1">
            RENOMETA CONNECT
          </text>
          <line x1={315} y1={108} x2={455} y2={108} stroke={faint} strokeWidth={0.5} />
          {[122, 142, 162, 182].map((y, i) => (
            <g key={y}>
              <circle cx={322} cy={y + 5} r={2} fill={i === 0 ? GOLD : main} opacity={i === 0 ? 1 : 0.5} />
              <rect x={332} y={y} width={110} height={10} rx={2} fill={faint} />
            </g>
          ))}
          <rect x={315} y={198} width={60} height={14} rx={3} fill={GOLD} opacity={0.15} stroke={GOLD} strokeWidth={0.5} />
          <text x={345} y={208} fontSize="7" fill={main} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="1">
            NEW LEAD
          </text>
        </g>
      </svg>
    </Frame>
  );
}

/* ------------ 8. Custom Build ------------ */
export function CustomBuildVisual({ tone = "light", size = "md", className }: VisualProps) {
  const { main, faint } = strokes(tone);
  const modules = [
    { x: 60, y: 80, label: "DATA" },
    { x: 60, y: 200, label: "AGENT" },
    { x: 200, y: 140, label: "LOGIC" },
    { x: 340, y: 80, label: "API" },
    { x: 340, y: 200, label: "UI" },
  ];
  const connections = [
    [0, 2], [1, 2], [2, 3], [2, 4],
  ];
  return (
    <Frame tone={tone} size={size} className={className}>
      <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full">
        {connections.map(([a, b], i) => {
          const m1 = modules[a]; const m2 = modules[b];
          return (
            <path key={i}
              d={`M ${m1.x + 80} ${m1.y + 25} C ${m1.x + 130} ${m1.y + 25}, ${m2.x - 30} ${m2.y + 25}, ${m2.x} ${m2.y + 25}`}
              stroke={main} strokeWidth={0.75} fill="none" strokeDasharray="4 3" />
          );
        })}
        {modules.map((m, i) => (
          <g key={m.label}>
            <rect x={m.x} y={m.y} width={80} height={50} rx={8}
              fill="none" stroke={i === 2 ? GOLD : main}
              strokeWidth={i === 2 ? 1 : 0.75}
              opacity={i === 2 ? 0.95 : 0.7} />
            {i === 2 && (
              <rect x={m.x} y={m.y} width={80} height={50} rx={8} fill={GOLD} opacity={0.06} />
            )}
            <line x1={m.x + 8} y1={m.y + 16} x2={m.x + 72} y2={m.y + 16} stroke={faint} strokeWidth={0.5} />
            <line x1={m.x + 8} y1={m.y + 26} x2={m.x + 50} y2={m.y + 26} stroke={faint} strokeWidth={0.5} />
            <text x={m.x + 40} y={m.y + 43} fontSize="9" fill={main} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="1">
              {m.label}
            </text>
          </g>
        ))}
        {/* packet animations */}
        {connections.map(([a, b], i) => {
          const m1 = modules[a]; const m2 = modules[b];
          const p = `M ${m1.x + 80} ${m1.y + 25} C ${m1.x + 130} ${m1.y + 25}, ${m2.x - 30} ${m2.y + 25}, ${m2.x} ${m2.y + 25}`;
          return (
            <circle key={i} r={2.5} fill={GOLD}>
              <animateMotion dur="4s" begin={`${i * 0.8}s`} repeatCount="indefinite" path={p} />
              <animate attributeName="opacity" values="0;1;1;0" dur="4s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
            </circle>
          );
        })}
      </svg>
    </Frame>
  );
}

/* ------------ Visual selector for pillars ------------ */
export const PILLAR_VISUALS: Record<string, (p: VisualProps) => ReactElement> = {
  "AI Center": AgentNetworkVisual,
  "Multi-Channel Inbox": UnifiedInboxVisual,
  "CRM & Sales": PipelineStackVisual,
  "Marketing & Lead Generation": AutomationFlowVisual,
  "Marketing & Follow-Up Automation": AutomationFlowVisual,
  "Operations & Workflow Automation": OperationsBlocksVisual,
  "Growth Operations": OperationsBlocksVisual,
  "Insights & Reporting": InsightsWaveVisual,
  "AI Website Systems": WebsiteToCrmVisual,
  "RenoMeta Connect": AgentNetworkVisual,
  "Custom AI Solutions": CustomBuildVisual,
};

export function PillarVisual({ name, ...rest }: { name: string } & VisualProps) {
  const Cmp = PILLAR_VISUALS[name] ?? AgentNetworkVisual;
  return <Cmp {...rest} />;
}

/* ------------ Blog category visual selector ------------ */
const CATEGORY_MAP: Record<string, (p: VisualProps) => ReactElement> = {
  "Lead Response": UnifiedInboxVisual,
  "CRM": PipelineStackVisual,
  "Automation": AutomationFlowVisual,
  "Estimates": WebsiteToCrmVisual,
  "Operations": OperationsBlocksVisual,
  "Marketing": InsightsWaveVisual,
  "AI": AgentNetworkVisual,
};

export function BlogCategoryVisual({ category, ...rest }: { category: string } & VisualProps) {
  const Cmp = CATEGORY_MAP[category] ?? AgentNetworkVisual;
  return <Cmp {...rest} />;
}
