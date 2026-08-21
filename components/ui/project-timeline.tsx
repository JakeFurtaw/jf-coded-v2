"use client";

import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

const PAD_PCT = 8;
const BAR_PX = 8;
const LANE_STEP = 22;
const SPINE_INSET = 14;
const HIT_WIDTH = 26;
const MONTH = 1 / 12;

const MONTH_ABBR = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
] as const;

interface Span {
  project: Project;
  start: number;
  end: number;
  ongoing: boolean;
  point: boolean;
  lane: number;
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

function parseProjectDates(
  value: string,
  nowT: number,
): { start: number; end: number; ongoing: boolean; point: boolean } | null {
  const text = value.trim();
  if (!text) return null;

  const ongoing = /\bpresent\b/i.test(text);
  const pairs: { month: number; year: number }[] = [];
  const re = /\b([A-Za-z]+)\s+((?:19|20)\d{2})\b/g;
  for (const match of text.matchAll(re)) {
    const month = monthFromName(match[1]);
    if (month !== null) pairs.push({ month, year: Number(match[2]) });
  }

  const tOf = (p: { month: number; year: number }) => toFraction(p.year, p.month);

  if (pairs.length >= 1) {
    const start = tOf(pairs[0]);
    const point = pairs.length === 1 && !ongoing;
    let end: number;
    if (ongoing) end = Math.max(nowT, start + MONTH);
    else if (pairs.length >= 2) end = tOf(pairs[1]) + MONTH;
    else end = start + MONTH;
    if (end <= start) end = start + MONTH;
    return { start, end, ongoing, point };
  }

  const years = [...text.matchAll(/\b((?:19|20)\d{2})\b/g)].map((x) => Number(x[1]));
  if (years.length === 1) {
    return { start: years[0], end: years[0] + 1, ongoing, point: false };
  }
  if (years.length >= 2) {
    const lo = Math.min(years[0], years[1]);
    const hi = Math.max(years[0], years[1]);
    return { start: lo, end: hi + 1, ongoing, point: false };
  }
  return null;
}

function assignLanes(items: Omit<Span, "lane">[]): Span[] {
  const sorted = [...items].sort(
    (a, b) => a.start - b.start || b.end - b.start - (a.end - a.start),
  );
  const laneEnds: number[] = [];
  return sorted.map((item) => {
    let lane = laneEnds.findIndex((end) => item.start >= end);
    if (lane === -1) {
      lane = laneEnds.length;
      laneEnds.push(item.end);
    } else {
      laneEnds[lane] = item.end;
    }
    return { ...item, lane };
  });
}

function formatShort(t: number): string {
  const year = Math.floor(t);
  const month = Math.min(11, Math.round((t - year) * 12));
  return `${MONTH_ABBR[month]} '${String(year).slice(2)}`;
}

function endLabel(span: Span): string {
  if (span.ongoing) return "now";
  return formatShort(span.end - MONTH);
}

/** Map time to vertical %; empty stretches compress so busy years get more room. */
function makeScale(
  spans: { start: number; end: number }[],
  startT: number,
  endT: number,
): (t: number) => number {
  const linear = (t: number) =>
    PAD_PCT + ((t - startT) / Math.max(endT - startT, 0.01)) * (100 - PAD_PCT * 2);

  const step = MONTH / 2;
  const samples: { t: number; w: number }[] = [];
  for (let t = startT; t <= endT + 1e-9; t += step) {
    let hits = 0;
    for (const s of spans) {
      if (t >= s.start && t < s.end) hits += 1;
    }
    samples.push({ t, w: hits > 0 ? 1 + (hits - 1) * 0.22 : 0.34 });
  }
  if (samples.length < 2) return linear;

  const cum = new Array<number>(samples.length);
  cum[0] = 0;
  for (let i = 1; i < samples.length; i++) {
    cum[i] = cum[i - 1] + (samples[i - 1].w + samples[i].w) / 2;
  }
  const total = cum[cum.length - 1] || 1;

  return (t: number) => {
    const clamped = Math.min(endT, Math.max(startT, t));
    let lo = 0;
    let hi = samples.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (samples[mid].t <= clamped) lo = mid;
      else hi = mid - 1;
    }
    const i = Math.min(lo, samples.length - 2);
    const t0 = samples[i].t;
    const t1 = samples[i + 1].t;
    const u = t1 === t0 ? 0 : (clamped - t0) / (t1 - t0);
    const c = cum[i] + u * (cum[i + 1] - cum[i]);
    return PAD_PCT + (c / total) * (100 - PAD_PCT * 2);
  };
}

export function ProjectTimeline({
  projects,
  selectedId,
  activeIds,
  onSelect,
}: {
  projects: Project[];
  selectedId: number | null;
  activeIds?: number[];
  onSelect: (project: Project) => void;
}) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [tooltipAnchor, setTooltipAnchor] = useState<{
    top: number;
    left: number;
    height: number;
  } | null>(null);

  const model = useMemo(() => {
    const nowT = nowFraction();
    const raw: Omit<Span, "lane">[] = [];
    for (const project of projects) {
      const parsed = parseProjectDates(project.dateInfo?.value ?? "", nowT);
      if (parsed) raw.push({ project, ...parsed });
    }
    if (raw.length === 0) {
      return {
        spans: [] as Span[],
        nowT,
        years: [] as number[],
        posPct: (t: number) => t,
      };
    }

    const minStart = raw.reduce((m, s) => Math.min(m, s.start), Infinity);
    const maxEnd = raw.reduce((m, s) => Math.max(m, s.end), -Infinity);
    const startT = Math.floor(minStart);
    const endT = Math.max(nowT, maxEnd) + 0.22;
    const spans = assignLanes(raw);
    const lastYear = Math.floor(Math.max(nowT, maxEnd));
    const years: number[] = [];
    for (let y = startT; y <= lastYear; y += 1) years.push(y);
    const posPct = makeScale(spans, startT, endT);

    return { spans, nowT, years, posPct };
  }, [projects]);

  const { spans, nowT, years, posPct } = model;
  const activeSet = activeIds && activeIds.length > 0 ? new Set(activeIds) : null;
  const focusId = hoveredId ?? selectedId;
  const hovered = spans.find((s) => s.project.id === hoveredId) ?? null;

  return (
    <div
      className="relative h-[72vh] w-full select-none overflow-visible"
      style={{ minHeight: 440 }}
      aria-label="Project timeline by duration"
    >
      <div className="pointer-events-none absolute top-0 left-0 right-1 flex items-center justify-end gap-3 pr-1 font-mono text-[8px] uppercase tracking-[0.16em] text-white/30">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-[3px] rounded-full bg-cyan-400/55" />
          duration
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rotate-45 bg-white/40" />
          month
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          live
        </span>
      </div>

      {years.map((year) => (
        <div
          key={`year-${year}`}
          className="pointer-events-none absolute left-0 right-0"
          style={{ top: `${posPct(year)}%` }}
        >
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "w-10 shrink-0 font-mono text-[10px] tracking-widest",
                year === Math.floor(nowT) ? "text-cyan-400/90" : "text-white/35",
              )}
            >
              {year}
            </span>
            <div className="h-px flex-1 bg-white/[0.07]" />
          </div>
        </div>
      ))}

      <div
        className="pointer-events-none absolute left-0 right-0 z-20"
        style={{ top: `${posPct(nowT)}%` }}
      >
        <div className="flex items-center gap-2 pl-10">
          <span className="rounded-sm bg-[#0a0a0f]/90 px-1 font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-cyan-400">
            now
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/70 to-cyan-400/15" />
        </div>
      </div>

      {hovered && (
        <>
          <RangeGuide top={posPct(hovered.start)} label={formatShort(hovered.start)} />
          {!hovered.point && (
            <RangeGuide top={posPct(hovered.end)} label={endLabel(hovered)} accent={hovered.ongoing} />
          )}
        </>
      )}

      <div className="pointer-events-none absolute inset-y-0 right-1 w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-cyan-400/55" />

      {spans.map((span) => {
        const { project, start, end, ongoing, point, lane } = span;
        const isSelected = selectedId === project.id;
        const isFocus = focusId === project.id;
        const isDimmed =
          (focusId !== null && !isFocus) ||
          (activeSet !== null && !activeSet.has(project.id) && !isFocus);
        const isWeb = project.category === "Web";
        const top = posPct(start);
        const height = Math.max(posPct(end) - posPct(start), 1.8);
        const right = SPINE_INSET + lane * LANE_STEP;

        const tone = isWeb
          ? {
              bar: "from-violet-300/90 via-fuchsia-400/55 to-violet-400/30",
              fill: "bg-violet-300",
              border: "border-violet-200/80",
              glow: "shadow-[0_0_12px_rgba(192,132,252,0.55)]",
            }
          : {
              bar: "from-cyan-200/95 via-cyan-400/60 to-cyan-400/25",
              fill: "bg-cyan-300",
              border: "border-cyan-200/80",
              glow: "shadow-[0_0_12px_rgba(34,211,238,0.55)]",
            };

        return (
          <button
            key={project.id}
            type="button"
            onClick={() => onSelect(project)}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setHoveredId(project.id);
              setTooltipAnchor({ top: rect.top, left: rect.right, height: rect.height });
            }}
            onMouseLeave={() => {
              setHoveredId(null);
              setTooltipAnchor(null);
            }}
            onFocus={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setHoveredId(project.id);
              setTooltipAnchor({ top: rect.top, left: rect.right, height: rect.height });
            }}
            onBlur={() => {
              setHoveredId(null);
              setTooltipAnchor(null);
            }}
            aria-label={`${project.title}, ${project.dateInfo?.value ?? "date unknown"}`}
            aria-current={isSelected ? "true" : undefined}
            className={cn(
              "group absolute z-10 touch-manipulation outline-none transition-opacity duration-200 focus-visible:z-30",
              isDimmed && "opacity-20",
            )}
            style={{
              top: `${top}%`,
              height: point ? HIT_WIDTH : `${height}%`,
              right: right - (HIT_WIDTH - BAR_PX) / 2,
              width: HIT_WIDTH,
              marginTop: point ? -HIT_WIDTH / 2 : 0,
            }}
          >
            {point ? (
              <span
                className={cn(
                  "absolute left-1/2 top-1/2 block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2px] border transition-all duration-200",
                  isFocus || isSelected
                    ? cn(tone.fill, tone.border, tone.glow, "scale-125")
                    : cn(
                        "group-hover:scale-110",
                        isWeb
                          ? "border-violet-300/55 bg-violet-300/45 group-hover:border-violet-200 group-hover:bg-violet-300"
                          : "border-white/40 bg-white/35 group-hover:border-cyan-200 group-hover:bg-cyan-400",
                      ),
                )}
              />
            ) : (
              <span className="absolute inset-y-0 left-1/2 w-2 -translate-x-1/2">
                <span
                  className={cn(
                    "absolute inset-0 rounded-full bg-gradient-to-b transition-all duration-200",
                    tone.bar,
                    isFocus || isSelected ? cn("opacity-100", tone.glow) : "opacity-85",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border",
                    isFocus || isSelected
                      ? cn(tone.fill, tone.border)
                      : "border-white/50 bg-white",
                  )}
                />
                {ongoing ? (
                  <motion.span
                    className={cn(
                      "absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full",
                      tone.fill,
                    )}
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
                  />
                ) : (
                  <span
                    className={cn(
                      "absolute bottom-0 left-1/2 h-[5px] w-[5px] -translate-x-1/2 translate-y-1/2 rounded-full",
                      isFocus || isSelected ? tone.fill : "bg-white/60",
                    )}
                  />
                )}
              </span>
            )}

          </button>
        );
      })}

      {hovered && tooltipAnchor && typeof document !== "undefined"
        ? createPortal(
            <div
              className="pointer-events-none fixed z-[80] w-max max-w-[18rem] rounded-md border border-white/10 bg-[#16161c]/95 px-2.5 py-1.5 text-left shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-md"
              style={{
                top:
                  tooltipAnchor.top > window.innerHeight * 0.72
                    ? tooltipAnchor.top - 8
                    : tooltipAnchor.top + tooltipAnchor.height / 2,
                left: tooltipAnchor.left + 12,
                transform:
                  tooltipAnchor.top > window.innerHeight * 0.72
                    ? "translateY(-100%)"
                    : "translateY(-50%)",
              }}
            >
              <span className="block text-xs font-medium text-white/90">
                {hovered.project.title}
              </span>
              <span className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] text-white/45">
                {hovered.ongoing && (
                  <span className="inline-flex items-center gap-1 text-cyan-400/90">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    live
                  </span>
                )}
                {hovered.point && !hovered.ongoing && (
                  <span className="text-white/35">month</span>
                )}
                {!hovered.point && !hovered.ongoing && (
                  <span className="text-white/35">duration</span>
                )}
                {hovered.project.dateInfo?.value ? (
                  <span>{hovered.project.dateInfo.value}</span>
                ) : null}
              </span>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

function RangeGuide({
  top,
  label,
  accent = false,
}: {
  top: number;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className="pointer-events-none absolute right-3 left-10 z-30"
      style={{ top: `${top}%` }}
    >
      <div className="flex -translate-y-1/2 items-center gap-2">
        <span
          className={cn(
            "rounded-sm bg-[#0a0a0f]/85 px-1 font-mono text-[9px] uppercase tracking-wider",
            accent ? "text-cyan-400" : "text-white/75",
          )}
        >
          {label}
        </span>
        <div
          className={cn(
            "h-px flex-1 border-t border-dashed",
            accent ? "border-cyan-400/50" : "border-white/30",
          )}
        />
      </div>
    </div>
  );
}
