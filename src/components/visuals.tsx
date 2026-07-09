/**
 * RenoMeta abstract technical visuals.
 * Minimal SVG line art with subtle gold accent, subtle 3D/isometric depth, and slow motion.
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
    fillSoft: tone === "dark" ? "rgba(230,225,215,0.04)" : "rgba(20,20,22,0.03)",
    fillMed: tone === "dark" ? "rgba(230,225,215,0.08)" : "rgba(20,20,22,0.06)",
    fillTop: tone === "dark" ? "rgba(255,250,240,0.06)" : "rgba(255,255,255,0.55)",
    fillSide: tone === "dark" ? "rgba(0,0,0,0.25)" : "rgba(20,20,22,0.07)",
  };
}

/* Shared SVG defs — glow, shadow, gradients for 3D feel */
function VisualDefs({ id, tone }: { id: string; tone: Tone }) {
  const isDark = tone === "dark";
  return (
    <defs>
      <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={GOLD} stopOpacity="0.35" />
        <stop offset="60%" stopColor={GOLD} stopOpacity="0.06" />
        <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${id}-face`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={isDark ? "rgba(255,250,240,0.10)" : "rgba(255,255,255,0.85)"} />
        <stop offset="100%" stopColor={isDark ? "rgba(255,250,240,0.02)" : "rgba(255,255,255,0.25)"} />
      </linearGradient>
      <linearGradient id={`${id}-goldFace`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={GOLD} stopOpacity="0.22" />
        <stop offset="100%" stopColor={GOLD} stopOpacity="0.04" />
      </linearGradient>
      <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
        <feOffset dx="0" dy="3" result="off" />
        <feComponentTransfer><feFuncA type="linear" slope="0.35" /></feComponentTransfer>
        <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id={`${id}-goldGlow`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2.5" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
  );
}

/* ------------ 1. Agent Network — orbiting AI core (with 3D depth) ------------ */
export function AgentNetworkVisual({ tone = "light", size = "md", className }: VisualProps) {
  const { main, faint } = strokes(tone);
  const cx = 250;
  const cy = 150;
  const textColor = tone === "dark" ? "rgba(245,240,230,0.95)" : "rgba(10,10,12,0.92)";
  const agents = [-60, 30, 120, 210];
  const orbitR = 100;
  const id = "agent";
  return (
    <Frame tone={tone} size={size} className={className}>
      <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full">
        <VisualDefs id={id} tone={tone} />
        {/* ambient glow */}
        <ellipse cx={cx} cy={cy} rx={160} ry={110} fill={`url(#${id}-glow)`} />
        {/* isometric orbit ellipses for 3D depth */}
        {[
          { rx: 150, ry: 55 },
          { rx: 115, ry: 42 },
          { rx: 80, ry: 30 },
        ].map((o, i) => (
          <ellipse key={i} cx={cx} cy={cy} rx={o.rx} ry={o.ry}
            fill="none" stroke={i === 1 ? main : faint}
            strokeWidth={0.8} opacity={i === 1 ? 0.7 : 0.5}
            strokeDasharray={i === 0 ? "2 5" : undefined}
            transform={`rotate(-18 ${cx} ${cy})`} />
        ))}
        {/* flat rings behind */}
        {[60, 100, 130].map((r, i) => (
          <circle key={r} cx={cx} cy={cy} r={r} fill="none"
            stroke={faint} strokeWidth={0.5} opacity={0.4}
            strokeDasharray={i === 0 ? "2 4" : undefined} />
        ))}
        <g style={{ transformOrigin: `${cx}px ${cy}px` }}>
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i * Math.PI * 2) / 24;
            return (
              <line key={i}
                x1={cx + Math.cos(a) * 128} y1={cy + Math.sin(a) * 128}
                x2={cx + Math.cos(a) * 134} y2={cy + Math.sin(a) * 134}
                stroke={main} strokeWidth={0.5} opacity={i % 6 === 0 ? 0.9 : 0.3} />
            );
          })}
          <animateTransform attributeName="transform" type="rotate"
            from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="80s" repeatCount="indefinite" />
        </g>
        {/* core sphere with gradient for 3D */}
        <circle cx={cx} cy={cy} r={44} fill={`url(#${id}-goldFace)`} stroke={GOLD} strokeWidth={1.2}
          filter={`url(#${id}-shadow)`} />
        <ellipse cx={cx - 10} cy={cy - 14} rx={22} ry={10} fill={tone === "dark" ? "rgba(255,250,240,0.10)" : "rgba(255,255,255,0.55)"} />
        <text x={cx} y={cy + 5} fontSize="13" fill={textColor} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="2.5" fontWeight="600">
          AI AGENT
        </text>
        <circle cx={cx} cy={cy} r={42} fill="none" stroke={GOLD} strokeWidth={0.75}>
          <animate attributeName="r" values="42;120;42" dur="6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0;0.6" dur="6s" repeatCount="indefinite" />
        </circle>
        {agents.map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = cx + Math.cos(rad) * orbitR;
          const y = cy + Math.sin(rad) * orbitR * 0.55; // flatten for isometric
          return (
            <g key={i} filter={`url(#${id}-shadow)`}>
              <line x1={cx + Math.cos(rad) * 44} y1={cy + Math.sin(rad) * 44 * 0.55} x2={x} y2={y} stroke={faint} strokeWidth={0.6} />
              <circle cx={x} cy={y} r={10} fill={`url(#${id}-face)`} stroke={GOLD} strokeWidth={1.1} />
              <circle cx={x - 2} cy={y - 3} r={3} fill={tone === "dark" ? "rgba(255,250,240,0.25)" : "rgba(255,255,255,0.9)"} />
              <circle cx={x} cy={y} r={2.4} fill={GOLD}>
                <animate attributeName="opacity" values="0.4;1;0.4"
                  dur={`${3 + (i % 2)}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

/* ------------ 2. Unified Inbox (3D) ------------ */
export function UnifiedInboxVisual({ tone = "light", size = "md", className }: VisualProps) {
  const { main, faint } = strokes(tone);
  const textColor = tone === "dark" ? "rgba(245,240,230,0.95)" : "rgba(10,10,12,0.92)";
  const rows = [0, 1, 2, 3, 4];
  const endX = 340;
  const centerY = 150;
  const id = "inbox";
  return (
    <Frame tone={tone} size={size} className={className}>
      <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full">
        <VisualDefs id={id} tone={tone} />
        <ellipse cx={endX + 65} cy={centerY} rx={130} ry={90} fill={`url(#${id}-glow)`} />
        {rows.map((i) => {
          const y = 50 + i * 50;
          const cx = 80;
          return (
            <g key={i}>
              {/* 3D source node */}
              <ellipse cx={cx + 2} cy={y + 3} rx={7} ry={2.5} fill="rgba(0,0,0,0.25)" />
              <circle cx={cx} cy={y} r={6} fill={`url(#${id}-face)`} stroke={main} strokeWidth={0.75} />
              <circle cx={cx} cy={y} r={2.5} fill={GOLD} opacity={i === 2 ? 1 : 0.6} />
              <path
                d={`M ${cx} ${y} C 200 ${y}, 260 ${centerY}, ${endX} ${centerY}`}
                stroke={main} strokeWidth={0.75} fill="none" opacity={0.6}
              />
              <circle r={2.5} fill={GOLD} filter={`url(#${id}-goldGlow)`}>
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
        {/* Inbox card with 3D side face */}
        <path d={`M ${endX + 130} ${centerY - 45} L ${endX + 140} ${centerY - 55} L ${endX + 140} ${centerY + 35} L ${endX + 130} ${centerY + 45} Z`}
          fill={`url(#${id}-face)`} stroke={GOLD} strokeWidth={0.9} opacity={0.6} />
        <path d={`M ${endX} ${centerY - 45} L ${endX + 10} ${centerY - 55} L ${endX + 140} ${centerY - 55} L ${endX + 130} ${centerY - 45} Z`}
          fill={`url(#${id}-goldFace)`} stroke={GOLD} strokeWidth={0.9} opacity={0.8} />
        <rect x={endX} y={centerY - 45} width={130} height={90} rx={10}
          fill={`url(#${id}-goldFace)`} stroke={GOLD} strokeWidth={1.1}
          filter={`url(#${id}-shadow)`} />
        {[-22, -4, 14].map((dy) => (
          <line key={dy} x1={endX + 14} y1={centerY + dy} x2={endX + 116} y2={centerY + dy} stroke={faint} strokeWidth={0.5} />
        ))}
        <text x={endX + 65} y={centerY + 38} fontSize="12" fill={textColor} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="2.5" fontWeight="600">
          INBOX
        </text>
      </svg>
    </Frame>
  );
}

/* ------------ 3. Pipeline Stack (3D perspective) ------------ */
export function PipelineStackVisual({ tone = "light", size = "md", className }: VisualProps) {
  const { main, faint, fillTop, fillSide } = strokes(tone);
  const textColor = tone === "dark" ? "rgba(245,240,230,0.95)" : "rgba(10,10,12,0.92)";
  const stages = [0, 1, 2, 3];
  const id = "pipeline";
  const D = 10; // depth offset
  return (
    <Frame tone={tone} size={size} className={className}>
      <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full">
        <VisualDefs id={id} tone={tone} />
        <text x={30} y={50} fontSize="12" fill={textColor} fontFamily="ui-monospace, monospace" letterSpacing="2.5" fontWeight="600">
          PIPELINE
        </text>
        {stages.map((i) => {
          const x = 30 + i * 115;
          const highlightCol = i === 1;
          return (
            <g key={i}>
              {/* side face */}
              <path d={`M ${x + 100} 70 L ${x + 100 + D} ${70 - D} L ${x + 100 + D} ${230 - D} L ${x + 100} 230 Z`}
                fill={fillSide} stroke={faint} strokeWidth={0.6} />
              {/* top face */}
              <path d={`M ${x} 70 L ${x + D} ${70 - D} L ${x + 100 + D} ${70 - D} L ${x + 100} 70 Z`}
                fill={fillTop} stroke={faint} strokeWidth={0.6} />
              {/* front */}
              <rect x={x} y={70} width={100} height={160} rx={10}
                fill={highlightCol ? `url(#${id}-goldFace)` : `url(#${id}-face)`}
                stroke={highlightCol ? GOLD : main}
                strokeWidth={highlightCol ? 1 : 0.75}
                filter={`url(#${id}-shadow)`} />
              <line x1={x + 10} y1={92} x2={x + 40} y2={92} stroke={highlightCol ? GOLD : main} strokeWidth={1.2} opacity={0.85} />
              {[0, 1, 2].map((k) => {
                const cy = 118 + k * 34;
                const highlight = (i + k) % 3 === 0;
                return (
                  <g key={k}>
                    <rect x={x + 10} y={cy} width={80} height={26} rx={5}
                      fill={tone === "dark" ? "rgba(255,250,240,0.03)" : "rgba(255,255,255,0.7)"}
                      stroke={highlight ? GOLD : main} strokeWidth={0.75}
                      opacity={highlight ? 0.95 : 0.7} />
                    <line x1={x + 16} y1={cy + 9} x2={x + 60} y2={cy + 9} stroke={main} strokeWidth={0.5} opacity={0.55} />
                    <line x1={x + 16} y1={cy + 16} x2={x + 48} y2={cy + 16} stroke={main} strokeWidth={0.5} opacity={0.3} />
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
                  <line x1={x + 100 + D} y1={150 - D} x2={x + 115} y2={150} stroke={main} strokeWidth={0.75} strokeDasharray="3 3" />
                  <circle r={2.4} fill={GOLD} filter={`url(#${id}-goldGlow)`}>
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

/* ------------ 4. Automation Flow (3D) ------------ */
export function AutomationFlowVisual({ tone = "light", size = "md", className }: VisualProps) {
  const { main, faint } = strokes(tone);
  const textColor = tone === "dark" ? "rgba(245,240,230,0.95)" : "rgba(10,10,12,0.92)";
  const id = "auto";
  return (
    <Frame tone={tone} size={size} className={className}>
      <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full">
        <VisualDefs id={id} tone={tone} />
        <text x={30} y={40} fontSize="12" fill={textColor} fontFamily="ui-monospace, monospace" letterSpacing="2.5" fontWeight="600">
          AUTOMATION
        </text>
        <ellipse cx={75} cy={150} rx={70} ry={50} fill={`url(#${id}-glow)`} />
        {/* trigger sphere */}
        <ellipse cx={77} cy={168} rx={14} ry={4} fill="rgba(0,0,0,0.28)" />
        <circle cx={75} cy={150} r={18} fill={`url(#${id}-goldFace)`} stroke={GOLD} strokeWidth={1.2}
          filter={`url(#${id}-shadow)`} />
        <ellipse cx={71} cy={144} rx={7} ry={3} fill={tone === "dark" ? "rgba(255,250,240,0.25)" : "rgba(255,255,255,0.85)"} />
        <circle cx={75} cy={150} r={4} fill={GOLD} />

        <path d="M 93 150 L 180 150" stroke={main} strokeWidth={0.9} fill="none" />
        <path d="M 180 150 C 210 150, 220 70, 270 70" stroke={main} strokeWidth={0.9} fill="none" />
        <path d="M 180 150 L 270 150" stroke={main} strokeWidth={0.9} fill="none" />
        <path d="M 180 150 C 210 150, 220 230, 270 230" stroke={main} strokeWidth={0.9} fill="none" />
        <circle cx={180} cy={150} r={3.2} fill={GOLD} />

        {[70, 150, 230].map((y, i) => (
          <g key={y} filter={`url(#${id}-shadow)`}>
            {/* 3D card */}
            <path d={`M 360 ${y - 18} L 368 ${y - 26} L 368 ${y + 10} L 360 ${y + 18} Z`}
              fill={i === 1 ? `url(#${id}-goldFace)` : `url(#${id}-face)`} stroke={i === 1 ? GOLD : faint} strokeWidth={0.7} opacity={0.7} />
            <path d={`M 270 ${y - 18} L 278 ${y - 26} L 368 ${y - 26} L 360 ${y - 18} Z`}
              fill={i === 1 ? `url(#${id}-goldFace)` : `url(#${id}-face)`} stroke={i === 1 ? GOLD : faint} strokeWidth={0.7} opacity={0.9} />
            <rect x={270} y={y - 18} width={90} height={36} rx={8}
              fill={i === 1 ? `url(#${id}-goldFace)` : `url(#${id}-face)`}
              stroke={i === 1 ? GOLD : main} strokeWidth={i === 1 ? 1 : 0.75} />
            <line x1={282} y1={y - 4} x2={348} y2={y - 4} stroke={faint} strokeWidth={0.5} />
            <line x1={282} y1={y + 6} x2={330} y2={y + 6} stroke={faint} strokeWidth={0.5} />
            <path d={`M 368 ${y} L 420 ${y}`} stroke={faint} strokeWidth={0.75} fill="none" />
            <circle cx={425} cy={y} r={5} fill="none" stroke={i === 1 ? GOLD : main} strokeWidth={0.75} />
            <circle cx={425} cy={y} r={2} fill={i === 1 ? GOLD : main}>
              <animate attributeName="opacity" values="0.3;1;0.3" dur={`${3 + i}s`} begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
        <circle r={2.6} fill={GOLD} filter={`url(#${id}-goldGlow)`}>
          <animateMotion dur="4s" repeatCount="indefinite"
            path="M 93 150 L 180 150 L 270 150" />
        </circle>
      </svg>
    </Frame>
  );
}

/* ------------ 5. Operations & Workflow Automation — sophisticated isometric grid ------------ */
export function OperationsBlocksVisual({ tone = "light", size = "md", className }: VisualProps) {
  const { main, faint, fillTop, fillSide } = strokes(tone);
  const id = "ops";
  // Isometric projection helper (scaled up for a bigger scene)
  const iso = (gx: number, gy: number, gz: number = 0) => ({
    x: 250 + (gx - gy) * 40,
    y: 165 + (gx + gy) * 20 - gz * 26,
  });

  // Grid tiles (4x4)
  const tiles: Array<{ gx: number; gy: number }> = [];
  for (let gx = -2; gx < 2; gx++) for (let gy = -2; gy < 2; gy++) tiles.push({ gx, gy });

  // Elevated blocks: workflow nodes
  const blocks = [
    { gx: -2, gy: -1, h: 1.2, accent: false, label: "IN" },
    { gx: -1, gy: -2, h: 0.8, accent: false },
    { gx: 0, gy: -1, h: 1.6, accent: true, label: "OPS" },
    { gx: 1, gy: 0, h: 1.0, accent: false },
    { gx: -1, gy: 1, h: 0.9, accent: false },
    { gx: 1, gy: -2, h: 0.7, accent: false },
    { gx: 0, gy: 1, h: 1.3, accent: true },
  ];

  // Connection paths (through the OPS core)
  const conns: Array<[[number, number], [number, number]]> = [
    [[-2, -1], [0, -1]],
    [[-1, -2], [0, -1]],
    [[1, -2], [0, -1]],
    [[0, -1], [1, 0]],
    [[0, -1], [-1, 1]],
    [[0, -1], [0, 1]],
  ];

  const textColor = tone === "dark" ? "rgba(245,240,230,0.95)" : "rgba(10,10,12,0.92)";
  const D = 22; // block face height per unit

  // Sort blocks back-to-front for painter's algorithm
  const sortedBlocks = [...blocks].sort((a, b) => (a.gx + a.gy) - (b.gx + b.gy));

  return (
    <Frame tone={tone} size={size} className={className}>
      <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full">
        <VisualDefs id={id} tone={tone} />
        {/* ambient */}
        <ellipse cx={250} cy={165} rx={210} ry={120} fill={`url(#${id}-glow)`} opacity={0.9} />

        {/* isometric floor grid tiles */}
        {tiles.map(({ gx, gy }, i) => {
          const p0 = iso(gx, gy);
          const p1 = iso(gx + 1, gy);
          const p2 = iso(gx + 1, gy + 1);
          const p3 = iso(gx, gy + 1);
          const isCenter = gx === 0 && gy === -1;
          return (
            <path
              key={i}
              d={`M ${p0.x} ${p0.y} L ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} Z`}
              fill={isCenter ? GOLD : fillTop}
              fillOpacity={isCenter ? 0.08 : 0.5}
              stroke={faint}
              strokeWidth={0.5}
            />
          );
        })}

        {/* connection lines drawn on floor (dashed) */}
        {conns.map(([[ax, ay], [bx, by]], i) => {
          const a = iso(ax + 0.5, ay + 0.5);
          const b = iso(bx + 0.5, by + 0.5);
          return (
            <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={main} strokeWidth={0.7} strokeDasharray="3 4" opacity={0.55} />
          );
        })}

        {/* elevated 3D blocks */}
        {sortedBlocks.map((b, i) => {
          const gx = b.gx + 0.15;
          const gy = b.gy + 0.15;
          const gx2 = b.gx + 0.85;
          const gy2 = b.gy + 0.85;
          const h = b.h;
          const stroke = b.accent ? GOLD : main;
          const sw = b.accent ? 1.1 : 0.8;

          // base corners
          const bTL = iso(gx, gy);
          const bTR = iso(gx2, gy);
          const bBR = iso(gx2, gy2);
          const bBL = iso(gx, gy2);
          // top corners
          const tTL = iso(gx, gy, h);
          const tTR = iso(gx2, gy, h);
          const tBR = iso(gx2, gy2, h);
          const tBL = iso(gx, gy2, h);

          return (
            <g key={i} filter={`url(#${id}-shadow)`}>
              {/* left side */}
              <path d={`M ${bTL.x} ${bTL.y} L ${bBL.x} ${bBL.y} L ${tBL.x} ${tBL.y} L ${tTL.x} ${tTL.y} Z`}
                fill={b.accent ? `url(#${id}-goldFace)` : fillSide} stroke={stroke} strokeWidth={sw} />
              {/* right side */}
              <path d={`M ${bBL.x} ${bBL.y} L ${bBR.x} ${bBR.y} L ${tBR.x} ${tBR.y} L ${tBL.x} ${tBL.y} Z`}
                fill={b.accent ? `url(#${id}-goldFace)` : fillSide} stroke={stroke} strokeWidth={sw} opacity={0.85} />
              {/* top face */}
              <path d={`M ${tTL.x} ${tTL.y} L ${tTR.x} ${tTR.y} L ${tBR.x} ${tBR.y} L ${tBL.x} ${tBL.y} Z`}
                fill={b.accent ? `url(#${id}-goldFace)` : `url(#${id}-face)`} stroke={stroke} strokeWidth={sw} />
              {/* top face detail lines */}
              <line x1={tTL.x + 6} y1={tTL.y + 6} x2={tTR.x - 6} y2={tTR.y + 6} stroke={faint} strokeWidth={0.5} />
              <line x1={tBL.x + 6} y1={tBL.y - 6} x2={tBR.x - 6} y2={tBR.y - 6} stroke={faint} strokeWidth={0.5} />
              {b.accent && (
                <circle cx={(tTL.x + tBR.x) / 2} cy={(tTL.y + tBR.y) / 2} r={2.4} fill={GOLD} filter={`url(#${id}-goldGlow)`}>
                  <animate attributeName="opacity" values="0.35;1;0.35" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        })}

        {/* data pulses along connections */}
        {conns.map(([[ax, ay], [bx, by]], i) => {
          const a = iso(ax + 0.5, ay + 0.5);
          const b = iso(bx + 0.5, by + 0.5);
          return (
            <circle key={i} r={2.4} fill={GOLD} filter={`url(#${id}-goldGlow)`}>
              <animateMotion dur={`${4 + (i % 3)}s`} begin={`${i * 0.5}s`} repeatCount="indefinite"
                path={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} />
              <animate attributeName="opacity" values="0;1;1;0" dur={`${4 + (i % 3)}s`} begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </circle>
          );
        })}

        {/* label */}
        <text x={30} y={40} fontSize="12" fill={textColor} fontFamily="ui-monospace, monospace" letterSpacing="2.5" fontWeight="600">
          OPERATIONS
        </text>
      </svg>
    </Frame>
  );
}

/* ------------ 6. Insights Wave (3D bars) ------------ */
export function InsightsWaveVisual({ tone = "light", size = "md", className }: VisualProps) {
  const { main, faint, fillTop, fillSide } = strokes(tone);
  const textColor = tone === "dark" ? "rgba(245,240,230,0.95)" : "rgba(10,10,12,0.92)";
  const id = "wave";
  const D = 6;
  return (
    <Frame tone={tone} size={size} className={className}>
      <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full">
        <VisualDefs id={id} tone={tone} />
        <text x={30} y={30} fontSize="12" fill={textColor} fontFamily="ui-monospace, monospace" letterSpacing="2.5" fontWeight="600">
          INSIGHTS
        </text>
        {[60, 110, 160, 210, 260].map((y) => (
          <line key={y} x1={30} y1={y} x2={470} y2={y} stroke={faint} strokeWidth={0.5} />
        ))}
        {[30, 140, 250, 360, 470].map((x) => (
          <line key={x} x1={x} y1={40} x2={x} y2={270} stroke={faint} strokeWidth={0.5} />
        ))}
        <path
          d="M 30 220 C 100 180, 160 200, 220 160 S 340 120, 400 130 S 470 90, 470 90"
          stroke={main} strokeWidth={0.75} fill="none" opacity={0.6}
        />
        {/* gold curve area fill for depth */}
        <path
          d="M 30 240 C 100 200, 160 210, 220 150 S 340 80, 400 100 S 470 60, 470 60 L 470 270 L 30 270 Z"
          fill={GOLD} opacity={0.05}
        />
        <path
          d="M 30 240 C 100 200, 160 210, 220 150 S 340 80, 400 100 S 470 60, 470 60"
          stroke={GOLD} strokeWidth={1.35} fill="none"
          strokeDasharray="600" strokeDashoffset="600"
          filter={`url(#${id}-goldGlow)`}
        >
          <animate attributeName="stroke-dashoffset" from="600" to="0" dur="4s" fill="freeze" />
        </path>
        {/* 3D bars */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const x = 60 + i * 50;
          const h = 20 + ((i * 37) % 60);
          const y = 260 - h;
          const accent = i === 4;
          return (
            <g key={i}>
              {/* top face */}
              <path d={`M ${x} ${y} L ${x + D} ${y - D} L ${x + 10 + D} ${y - D} L ${x + 10} ${y} Z`}
                fill={accent ? GOLD : fillTop} fillOpacity={accent ? 0.4 : 1} stroke={accent ? GOLD : faint} strokeWidth={0.5} />
              {/* side face */}
              <path d={`M ${x + 10} ${y} L ${x + 10 + D} ${y - D} L ${x + 10 + D} ${260 - D} L ${x + 10} 260 Z`}
                fill={accent ? GOLD : fillSide} fillOpacity={accent ? 0.5 : 1} stroke={accent ? GOLD : faint} strokeWidth={0.5} />
              {/* front */}
              <rect x={x} y={y} width={10} height={h} rx={1}
                fill={accent ? `url(#${id}-goldFace)` : `url(#${id}-face)`}
                stroke={accent ? GOLD : main} strokeWidth={accent ? 0.9 : 0.5}
                opacity={accent ? 1 : 0.7}>
                <animate attributeName="height" from="0" to={h} dur="1.2s" begin={`${i * 0.08}s`} fill="freeze" />
                <animate attributeName="y" from={260} to={y} dur="1.2s" begin={`${i * 0.08}s`} fill="freeze" />
              </rect>
            </g>
          );
        })}
        <circle r={3.2} fill={GOLD} filter={`url(#${id}-goldGlow)`}>
          <animateMotion dur="8s" repeatCount="indefinite"
            path="M 30 240 C 100 200, 160 210, 220 150 S 340 80, 400 100 S 470 60, 470 60" />
        </circle>
      </svg>
    </Frame>
  );
}

/* ------------ 7. Website → CRM (3D) ------------ */
export function WebsiteToCrmVisual({ tone = "light", size = "md", className }: VisualProps) {
  const { main, faint } = strokes(tone);
  const id = "web";
  const D = 10;
  return (
    <Frame tone={tone} size={size} className={className}>
      <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full">
        <VisualDefs id={id} tone={tone} />
        {/* website window with 3D depth */}
        <g filter={`url(#${id}-shadow)`}>
          <path d={`M 210 60 L ${210 + D} ${60 - D} L ${210 + D} ${240 - D} L 210 240 Z`}
            fill={tone === "dark" ? "rgba(0,0,0,0.25)" : "rgba(20,20,22,0.08)"} stroke={faint} strokeWidth={0.6} />
          <path d={`M 30 60 L ${30 + D} ${60 - D} L ${210 + D} ${60 - D} L 210 60 Z`}
            fill={`url(#${id}-face)`} stroke={faint} strokeWidth={0.6} />
          <rect x={30} y={60} width={180} height={180} rx={10}
            fill={`url(#${id}-face)`} stroke={main} strokeWidth={0.85} />
          <line x1={30} y1={82} x2={210} y2={82} stroke={faint} strokeWidth={0.5} />
          <circle cx={42} cy={71} r={2} fill={main} opacity={0.6} />
          <circle cx={50} cy={71} r={2} fill={main} opacity={0.6} />
          <circle cx={58} cy={71} r={2} fill={main} opacity={0.6} />
          <rect x={40} y={100} width={100} height={8} rx={2} fill={faint} />
          <rect x={40} y={118} width={160} height={8} rx={2} fill={faint} />
          <rect x={40} y={132} width={130} height={8} rx={2} fill={faint} />
          <rect x={40} y={155} width={160} height={26} rx={4} fill="none" stroke={faint} strokeWidth={0.5} />
          <rect x={40} y={195} width={70} height={22} rx={4} fill={GOLD} opacity={0.25} stroke={GOLD} strokeWidth={0.9} />
        </g>
        {/* connection */}
        <path d="M 210 170 C 250 170, 260 150, 300 150" stroke={main} strokeWidth={0.9} fill="none" strokeDasharray="3 3" />
        {[0, 1, 2].map((i) => (
          <circle key={i} r={2.6} fill={GOLD} filter={`url(#${id}-goldGlow)`}>
            <animateMotion dur="3s" begin={`${i * 1}s`} repeatCount="indefinite"
              path="M 210 170 C 250 170, 260 150, 300 150" />
            <animate attributeName="opacity" values="0;1;1;0" dur="3s" begin={`${i * 1}s`} repeatCount="indefinite" />
          </circle>
        ))}
        {/* CRM card with 3D */}
        <g filter={`url(#${id}-shadow)`}>
          <path d={`M 470 80 L ${470 + D} ${80 - D} L ${470 + D} ${220 - D} L 470 220 Z`}
            fill={`url(#${id}-goldFace)`} stroke={GOLD} strokeWidth={0.9} opacity={0.7} />
          <path d={`M 300 80 L ${300 + D} ${80 - D} L ${470 + D} ${80 - D} L 470 80 Z`}
            fill={`url(#${id}-goldFace)`} stroke={GOLD} strokeWidth={0.9} opacity={0.9} />
          <rect x={300} y={80} width={170} height={140} rx={10}
            fill={`url(#${id}-goldFace)`} stroke={GOLD} strokeWidth={1.1} />
          <line x1={315} y1={108} x2={455} y2={108} stroke={faint} strokeWidth={0.5} />
          {[122, 142, 162, 182].map((y, i) => (
            <g key={y}>
              <circle cx={322} cy={y + 5} r={2.6} fill={i === 0 ? GOLD : main} opacity={i === 0 ? 1 : 0.6} />
              <rect x={332} y={y + 1} width={110} height={8} rx={2} fill={faint} />
            </g>
          ))}
        </g>
      </svg>
    </Frame>
  );
}

/* ------------ 8. Custom Build (3D modules) ------------ */
export function CustomBuildVisual({ tone = "light", size = "md", className }: VisualProps) {
  const { main, faint } = strokes(tone);
  const id = "custom";
  const D = 9;
  const modules = [
    { x: 60, y: 80 },
    { x: 60, y: 200 },
    { x: 200, y: 140 },
    { x: 340, y: 80 },
    { x: 340, y: 200 },
  ];
  const connections: [number, number][] = [[0, 2], [1, 2], [2, 3], [2, 4]];
  return (
    <Frame tone={tone} size={size} className={className}>
      <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full">
        <VisualDefs id={id} tone={tone} />
        <ellipse cx={240} cy={165} rx={80} ry={50} fill={`url(#${id}-glow)`} />
        {connections.map(([a, b], i) => {
          const m1 = modules[a]; const m2 = modules[b];
          return (
            <path key={i}
              d={`M ${m1.x + 80} ${m1.y + 25} C ${m1.x + 130} ${m1.y + 25}, ${m2.x - 30} ${m2.y + 25}, ${m2.x} ${m2.y + 25}`}
              stroke={main} strokeWidth={0.8} fill="none" strokeDasharray="4 3" />
          );
        })}
        {modules.map((m, i) => {
          const accent = i === 2;
          return (
            <g key={i} filter={`url(#${id}-shadow)`}>
              {/* right side */}
              <path d={`M ${m.x + 80} ${m.y} L ${m.x + 80 + D} ${m.y - D} L ${m.x + 80 + D} ${m.y + 50 - D} L ${m.x + 80} ${m.y + 50} Z`}
                fill={accent ? `url(#${id}-goldFace)` : `url(#${id}-face)`} stroke={accent ? GOLD : faint} strokeWidth={0.7} opacity={0.75} />
              {/* top */}
              <path d={`M ${m.x} ${m.y} L ${m.x + D} ${m.y - D} L ${m.x + 80 + D} ${m.y - D} L ${m.x + 80} ${m.y} Z`}
                fill={accent ? `url(#${id}-goldFace)` : `url(#${id}-face)`} stroke={accent ? GOLD : faint} strokeWidth={0.7} opacity={0.9} />
              {/* front */}
              <rect x={m.x} y={m.y} width={80} height={50} rx={8}
                fill={accent ? `url(#${id}-goldFace)` : `url(#${id}-face)`}
                stroke={accent ? GOLD : main}
                strokeWidth={accent ? 1.1 : 0.8} />
              <line x1={m.x + 10} y1={m.y + 18} x2={m.x + 70} y2={m.y + 18} stroke={faint} strokeWidth={0.6} />
              <line x1={m.x + 10} y1={m.y + 30} x2={m.x + 52} y2={m.y + 30} stroke={faint} strokeWidth={0.6} />
              {accent && (
                <circle cx={m.x + 40} cy={m.y + 25} r={3.2} fill={GOLD} filter={`url(#${id}-goldGlow)`}>
                  <animate attributeName="opacity" values="0.4;1;0.4" dur="2.4s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        })}
        {connections.map(([a, b], i) => {
          const m1 = modules[a]; const m2 = modules[b];
          const p = `M ${m1.x + 80} ${m1.y + 25} C ${m1.x + 130} ${m1.y + 25}, ${m2.x - 30} ${m2.y + 25}, ${m2.x} ${m2.y + 25}`;
          return (
            <circle key={i} r={2.6} fill={GOLD} filter={`url(#${id}-goldGlow)`}>
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
