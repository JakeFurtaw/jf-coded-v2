"use client";

import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

const MONTH = 1 / 12;
/** Narrow bars (1–2 month projects) never render thinner than this. */
const MIN_BAR = "6px";

const MONTH_ABBR = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
] as const;

/**
 * Category hues, validated (dataviz validate_palette.js, dark mode, surface #0a0a0f):
 * lightness band, chroma, CVD separation (deutan ΔE 12.6), and contrast all pass.
 * `strong` is the brighter emphasis step used for the highlighted row only.
 */
const TONE = {
  "AI/ML": {
    base: "bg-[#0aa5c4]",
    strong: "bg-[#22d3ee]",
    glow: "shadow-[0_0_10px_rgba(34,211,238,0.55)]",
  },
  Web: {
    base: "bg-[#a855f7]",
    strong: "bg-[#c084fc]",
    glow: "shadow-[0_0_10px_rgba(192,132,252,0.55)]",
  },
} as const;

const LAYOUT = {
  rail: {
    cols: "grid-cols-[6rem_minmax(0,1fr)] xl:grid-cols-[7rem_minmax(0,1fr)]",
    row: "h-7",
    label: "text-[11px] xl:text-xs",
  },
  inline: {
    cols: "grid-cols-[7.5rem_minmax(0,1fr)] sm:grid-cols-[10rem_minmax(0,1fr)]",
    row: "h-9",
    label: "text-xs sm:text-[13px]",
  },
} as const;

interface Span {
  project: Project;
  start: number;
  end: number;
  ongoing: boolean;
}

function monthFromName(name: string): number | null {
  const idx = MONTH_ABBR.indexOf(name.toLowerCase().slice(0, 3) as (typeof MONTH_ABBR)[number]);
  return idx === -1 ? null : idx;
}

function toFraction(year: number, month = 0, day = 0): number {
  return year + month / 12 + day / 365;
}

function nowFraction(): number {
  const n = new Date();
  return toFraction(n.getFullYear(), n.getMonth(), n.getDate());
}

/** Parses dateInfo values like "Aug 2024 - May 2025", "May 2026 - Present", "April 2026". */
function parseProjectDates(
  value: string,
  nowT: number,
): { start: number; end: number; ongoing: boolean } | null {
  const text = value.trim();
  if (!text) return null;

  const ongoing = /\bpresent\b/i.test(text);
  const pairs: { month: number; year: number }[] = [];
  for (const match of text.matchAll(/\b([A-Za-z]+)\s+((?:19|20)\d{2})\b/g)) {
    const month = monthFromName(match[1]);
    if (month !== null) pairs.push({ month, year: Number(match[2]) });
  }

  if (pairs.length >= 1) {
    const start = toFraction(pairs[0].year, pairs[0].month);
    let end: number;
    if (ongoing) end = Math.max(nowT, start + MONTH);
    else if (pairs.length >= 2) end = toFraction(pairs[1].year, pairs[1].month) + MONTH;
    else end = start + MONTH;
    return { start, end: Math.max(end, start + MONTH), ongoing };
  }

  const years = [...text.matchAll(/\b((?:19|20)\d{2})\b/g)].map((x) => Number(x[1]));
  if (years.length === 0) return null;
  const lo = Math.min(...years);
  const hi = Math.max(...years);
  return { start: lo, end: hi + 1, ongoing };
}

export function ProjectTimeline({
  projects,
  selectedId = null,
  highlightedId = null,
  activeIds,
  onHighlight,
  onSelect,
  variant = "rail",
  className,
}: {
  projects: Project[];
  selectedId?: number | null;
  /** Project highlighted elsewhere on the page (e.g. its card is hovered). */
  highlightedId?: number | null;
  /** Projects matching the current filter; others are muted. */
  activeIds?: number[];
  onHighlight?: (id: number | null) => void;
  onSelect: (project: Project) => void;
  variant?: "rail" | "inline";
  className?: string;
}) {
  const [tip, setTip] = useState<{ span: Span; rect: DOMRect } | null>(null);
  const L = LAYOUT[variant];

  const { spans, years, x } = useMemo(() => {
    const nowT = nowFraction();
    const parsed: Span[] = [];
    for (const project of projects) {
      const d = parseProjectDates(project.dateInfo?.value ?? "", nowT);
      if (d) parsed.push({ project, ...d });
    }
    // Newest first: ongoing work, then by most recent end date.
    parsed.sort(
      (a, b) => Number(b.ongoing) - Number(a.ongoing) || b.end - a.end || b.start - a.start,
    );

    const startT = parsed.length ? Math.floor(Math.min(...parsed.map((s) => s.start))) : 0;
    const endT = Math.max(nowT, ...parsed.map((s) => s.end)) + 0.1;
    const yearList: number[] = [];
    for (let y = startT; y <= Math.floor(endT); y += 1) yearList.push(y);
    const scale = (t: number) =>
      ((Math.min(endT, Math.max(startT, t)) - startT) / Math.max(endT - startT, 0.01)) * 100;

    return { spans: parsed, years: yearList, x: scale };
  }, [projects]);

  const activeSet = activeIds ? new Set(activeIds) : null;

  const showTip = (span: Span, el: HTMLElement) =>
    setTip({ span, rect: el.getBoundingClientRect() });
  const clear = () => {
    onHighlight?.(null);
    setTip(null);
  };

  if (spans.length === 0) return null;

  return (
    <div className={cn("w-full select-none", className)} role="group" aria-label="Project timeline">
      {/* Header + legend */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-1.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
          Timeline
        </span>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/55">
          <LegendBar className={TONE["AI/ML"].base} label="AI/ML" />
          <LegendBar className={TONE.Web.base} label="Web" />
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#22d3ee]" />
            Ongoing
          </span>
        </div>
      </div>

      {/* Year axis */}
      <div className={cn("grid gap-x-3 px-1.5 pb-1", L.cols)} aria-hidden>
        <span />
        <span className="relative h-4">
          {years.map((y) => (
            <span
              key={y}
              className="absolute top-0 pl-1 font-mono text-[10px] leading-4 text-white/40"
              style={{ left: `${x(y)}%` }}
            >
              &apos;{String(y).slice(2)}
            </span>
          ))}
        </span>
      </div>

      {/* Rows */}
      <div className="flex flex-col">
        {spans.map((span) => {
          const { project, start, end, ongoing } = span;
          const tone = TONE[project.category];
          const isHi = highlightedId === project.id || selectedId === project.id;
          const isMuted = activeSet !== null && !activeSet.has(project.id) && !isHi;
          const left = x(start);
          const width = x(end) - left;

          return (
            <button
              key={project.id}
              type="button"
              onClick={() => onSelect(project)}
              onPointerEnter={(e) => {
                onHighlight?.(project.id);
                if (e.pointerType === "mouse") showTip(span, e.currentTarget);
              }}
              onPointerLeave={clear}
              onFocus={(e) => {
                onHighlight?.(project.id);
                // Keyboard focus only; a tap also focuses the button and would strand the tooltip.
                if (e.currentTarget.matches(":focus-visible")) showTip(span, e.currentTarget);
              }}
              onBlur={clear}
              aria-label={`${project.title}, ${project.dateInfo?.value ?? "date unknown"}. Jump to project.`}
              className={cn(
                "grid w-full items-center gap-x-3 rounded-md px-1.5 text-left outline-none transition-[background-color,opacity] duration-200 touch-manipulation focus-visible:ring-1 focus-visible:ring-cyan-400/60",
                L.cols,
                L.row,
                isHi ? "bg-white/[0.07]" : "hover:bg-white/[0.04]",
                isMuted && "opacity-35",
              )}
            >
              <span
                className={cn(
                  "truncate transition-colors duration-200",
                  L.label,
                  isHi ? "text-white" : "text-white/65",
                )}
              >
                {project.shortTitle ?? project.title}
              </span>

              <span className="relative h-full" aria-hidden>
                {/* Year gridlines (rows stack flush, so these read as continuous lines) */}
                {years.map((y) => (
                  <span
                    key={y}
                    className="absolute inset-y-0 w-px bg-white/[0.06]"
                    style={{ left: `${x(y)}%` }}
                  />
                ))}
                <span
                  className={cn(
                    "absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full transition-[background-color,box-shadow] duration-200",
                    isHi ? cn(tone.strong, tone.glow) : tone.base,
                  )}
                  style={{ left: `${left}%`, width: `max(${MIN_BAR}, ${width}%)` }}
                />
                {ongoing && (
                  <motion.span
                    className={cn(
                      "absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-space-bg",
                      tone.strong,
                    )}
                    style={{ left: `${x(end)}%` }}
                    animate={{ scale: [1, 1.35, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {tip && typeof document !== "undefined"
        ? createPortal(
            <TimelineTooltip span={tip.span} rect={tip.rect} placement={variant === "rail" ? "right" : "above"} />,
            document.body,
          )
        : null}
    </div>
  );
}

function LegendBar({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("h-1.5 w-3.5 rounded-full", className)} />
      {label}
    </span>
  );
}

function TimelineTooltip({
  span,
  rect,
  placement,
}: {
  span: Span;
  rect: DOMRect;
  placement: "right" | "above";
}) {
  const { project, ongoing } = span;
  const style =
    placement === "right"
      ? { top: rect.top + rect.height / 2, left: rect.right + 12, transform: "translateY(-50%)" }
      : { top: rect.top - 8, left: rect.left + rect.width / 2, transform: "translate(-50%, -100%)" };

  return (
    <div
      className="pointer-events-none fixed z-[80] w-max max-w-[18rem] rounded-md border border-white/10 bg-space-card/95 px-3 py-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-md"
      style={style}
    >
      <span className="block text-xs font-medium text-white/90">{project.title}</span>
      <span className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[11px] text-white/55">
        <span>{project.category}</span>
        <span className="text-white/25">·</span>
        <span>{project.dateInfo?.value.trim()}</span>
        {ongoing && (
          <span className="inline-flex items-center gap-1 text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            ongoing
          </span>
        )}
      </span>
    </div>
  );
}
