"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Check, FastForward, Pause, Play, RotateCcw, X } from "lucide-react";
import { dossierReplay, type ReplayEvent } from "@/lib/dossier-replay";
import { cn } from "@/lib/utils";

/** Two synthetic steps after the recorded events: the final answer, then the citation audit. */
type Step = ReplayEvent | { t: "final" } | { t: "audit" };
const STEPS: Step[] = [...dossierReplay.events, { t: "final" }, { t: "audit" }];

/** Base delay (ms at 1×) before each step is revealed. */
const DELAY: Record<Step["t"], number> = {
  spawn: 420, tool: 320, stop: 520, verdict: 1000, note: 900, final: 1100, audit: 1300,
};
const SPEEDS = [1, 2, 4] as const;

interface AgentState {
  id: string;
  role: string;
  parent?: string;
  topic?: string;
  note?: string;
  calls: number;
  stop?: string;
  verdict?: string;
}

interface LogLine {
  key: number;
  agent: string;
  label: string;
  text: string;
  tone: "tool" | "verdict" | "note" | "done";
  verdict?: string;
}

function derive(count: number) {
  const agents = new Map<string, AgentState>();
  const order: string[] = [];
  const log: LogLine[] = [];
  let tools = 0;
  let evaluations = 0;

  STEPS.slice(0, count).forEach((s, i) => {
    switch (s.t) {
      case "spawn":
        agents.set(s.agent, { id: s.agent, role: s.role, parent: s.parent, topic: s.topic, note: s.note, calls: 0 });
        order.push(s.agent);
        if (s.role !== "planner") {
          log.push({ key: i, agent: s.parent ?? "", label: "spawn", text: `${s.agent}${s.topic ? ` · ${s.topic}` : ""}${s.note ? ` (${s.note})` : ""}`, tone: "note" });
        }
        break;
      case "tool": {
        const a = agents.get(s.agent);
        if (a) a.calls += 1;
        if (s.tool === "web_search" || s.tool === "browse_page") tools += 1;
        // The synthetic "final" step logs the answer, so skip the recorded final_answer call here.
        if (s.tool !== "final_answer") log.push({ key: i, agent: s.agent, label: s.tool, text: s.arg, tone: "tool" });
        break;
      }
      case "verdict": {
        const a = agents.get(s.agent);
        if (a) a.verdict = s.verdict;
        evaluations += 1;
        const target = a?.parent ? ` ${a.parent}` : "";
        log.push({ key: i, agent: s.agent, label: "verdict", text: `${s.verdict}${target}`, tone: "verdict", verdict: s.verdict });
        break;
      }
      case "note":
        log.push({ key: i, agent: s.agent, label: "note", text: s.text, tone: "note" });
        break;
      case "stop": {
        const a = agents.get(s.agent);
        if (a) a.stop = s.reason;
        break;
      }
      case "final":
        log.push({ key: i, agent: "planner-1", label: "final_answer", text: "answer written from graded reports", tone: "done" });
        break;
      case "audit":
        log.push({ key: i, agent: "audit", label: "citations", text: auditSummary(), tone: "done" });
        break;
    }
  });

  return { agents, order, log, tools, evaluations, showAudit: count >= STEPS.length };
}

function auditSummary() {
  const ok = dossierReplay.audit.filter((a) => a.verified).length;
  return `${ok}/${dossierReplay.audit.length} verified`;
}

/** For an unverified citation, the page a researcher actually browsed on the same host (if any). */
function closestBrowsed(url: string): string | null {
  const host = new URL(url).hostname.replace(/^www\./, "");
  const hit = dossierReplay.events.find(
    (e) => e.t === "tool" && e.tool === "browse_page" && e.arg.startsWith(host),
  );
  return hit && hit.t === "tool" ? hit.arg : null;
}

export function DossierReplay() {
  const reduceMotion = useReducedMotion();
  const [rawCount, setCount] = useState(0);
  const [playing, setPlaying] = useState(false);
  /** True once the viewer has interacted; until then reduced-motion viewers see the finished run. */
  const [touched, setTouched] = useState(false);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(2);
  const startedRef = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  // Reduced motion: open on the finished run; playback stays available on request.
  const count = reduceMotion && !touched ? STEPS.length : rawCount;
  const done = count >= STEPS.length;
  const isPlaying = playing && !done;
  const state = useMemo(() => derive(count), [count]);
  const reduceRef = useRef(reduceMotion);
  useEffect(() => {
    reduceRef.current = reduceMotion;
  }, [reduceMotion]);

  // Autoplay once, when the player scrolls into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current && !reduceRef.current) {
          startedRef.current = true;
          setPlaying(true);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Advance one step at a time.
  useEffect(() => {
    if (!isPlaying) return;
    const id = setTimeout(() => setCount((c) => c + 1), DELAY[STEPS[count].t] / speed);
    return () => clearTimeout(id);
  }, [isPlaying, count, speed]);

  // Keep the newest log line in view (scrolls the log box only, never the page).
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [state.log.length]);

  const restart = () => {
    startedRef.current = true;
    setTouched(true);
    setCount(0);
    setPlaying(true);
  };

  const roots = state.order.filter((id) => !state.agents.get(id)?.parent);
  const childrenOf = (id: string) => state.order.filter((c) => state.agents.get(c)?.parent === id);
  const progress = Math.round((count / STEPS.length) * 100);

  return (
    <div ref={rootRef} className="glass overflow-hidden rounded-2xl border border-white/10">
      {/* Title bar */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-white/10 bg-white/[0.03] px-4 py-2.5 font-mono text-[11px]">
        <span className="text-white/70">
          dossier <span className="text-white/35">·</span> replay of a real run
        </span>
        <span className="text-white/45">
          {dossierReplay.model} <span className="text-white/25">·</span> real time {dossierReplay.durationSec}s
        </span>
      </div>

      {/* Goal */}
      <div className="border-b border-white/10 px-4 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-400/80">Goal</span>
        <p className="mt-1 text-sm leading-relaxed text-white/80">{dossierReplay.goal}</p>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Agent tree */}
        <div className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r">
          <PanelLabel>Live agents</PanelLabel>
          <ul className="mt-3 space-y-1 font-mono text-xs" aria-label="Agent tree">
            {roots.map((id) => (
              <AgentRow key={id} id={id} depth={0} state={state} childrenOf={childrenOf} running={isPlaying} />
            ))}
            {roots.length === 0 && <li className="text-white/35">waiting to start…</li>}
          </ul>
        </div>

        {/* Tool log */}
        <div className="flex min-w-0 flex-col p-4">
          <PanelLabel>Tool calls</PanelLabel>
          <div
            ref={logRef}
            className="mt-3 h-60 overflow-y-auto pr-1 font-mono text-[11px] leading-relaxed sm:h-72 [scrollbar-width:thin]"
          >
            {state.log.map((line) => (
              <div key={line.key} className="flex min-w-0 gap-2 whitespace-nowrap">
                <span className="w-[5.5rem] shrink-0 truncate text-white/40">{line.agent}</span>
                <span
                  className={cn(
                    "shrink-0",
                    line.tone === "tool" && "text-cyan-300/90",
                    line.tone === "note" && "text-white/45",
                    line.tone === "done" && "text-violet-300",
                    line.tone === "verdict" && verdictText(line.verdict),
                  )}
                >
                  {line.label}
                </span>
                <span className="min-w-0 truncate text-white/60">{line.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Citation audit */}
      {state.showAudit && (
        <div className="border-t border-white/10 p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <PanelLabel>Citation audit · deterministic, no model call</PanelLabel>
            <span className="font-mono text-xs text-white/70">
              {auditSummary()} <span className="text-white/40">cited URLs traced to tool output</span>
            </span>
          </div>
          <ul className="mt-3 space-y-1.5 text-xs">
            {dossierReplay.audit.map((row) => {
              const near = row.verified ? null : closestBrowsed(row.url);
              return (
                <li key={row.url} className="flex min-w-0 items-start gap-2">
                  {row.verified ? (
                    <Check size={14} className="mt-px shrink-0 text-emerald-400" aria-label="verified" />
                  ) : (
                    <X size={14} className="mt-px shrink-0 text-rose-400" aria-label="unverified" />
                  )}
                  <span className="min-w-0">
                    <span className="break-all font-mono text-white/75">{row.url.replace(/^https?:\/\/(www\.)?/, "")}</span>
                    {!row.verified && (
                      <span className="block text-white/45">
                        Flagged: not in any tool output{near ? ` (a researcher browsed ${near})` : ""}. The planner rewrote this URL.
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 border-t border-white/10 bg-white/[0.02] px-4 py-3">
        <button
          type="button"
          onClick={() => {
            if (done) return restart();
            startedRef.current = true;
            setTouched(true);
            setPlaying((p) => !p);
          }}
          aria-label={done ? "Replay" : isPlaying ? "Pause" : "Play"}
          className="inline-flex h-8 items-center gap-1.5 rounded-md bg-cyan-400 px-3 text-xs font-medium text-black transition-colors hover:bg-cyan-300 touch-manipulation"
        >
          {done ? <RotateCcw size={14} /> : isPlaying ? <Pause size={14} /> : <Play size={14} />}
          {done ? "Replay" : isPlaying ? "Pause" : "Play"}
        </button>
        {!done && (
          <button
            type="button"
            onClick={() => {
              startedRef.current = true;
              setTouched(true);
              setCount(STEPS.length);
              setPlaying(false);
            }}
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-white/15 px-3 text-xs text-white/75 transition-colors hover:border-cyan-400/50 hover:text-white touch-manipulation"
          >
            <FastForward size={14} /> Skip to end
          </button>
        )}
        <div className="flex overflow-hidden rounded-md border border-white/15" role="group" aria-label="Playback speed">
          {SPEEDS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSpeed(s)}
              aria-pressed={speed === s}
              className={cn(
                "h-8 px-2.5 font-mono text-xs transition-colors touch-manipulation",
                speed === s ? "bg-white/15 text-white" : "text-white/55 hover:text-white",
              )}
            >
              {s}×
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-3 font-mono text-[11px] text-white/50">
          <span>{state.order.length} agents</span>
          <span>{state.tools} searches/pages</span>
          <span>{state.evaluations} evals</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10" aria-hidden>
          <div className="h-full rounded-full bg-cyan-400 transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

function PanelLabel({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">{children}</span>;
}

function verdictText(v?: string) {
  if (v === "PASS") return "text-emerald-400";
  if (v === "WEAK") return "text-amber-400";
  return "text-rose-400";
}

function AgentRow({
  id,
  depth,
  state,
  childrenOf,
  running,
}: {
  id: string;
  depth: number;
  state: ReturnType<typeof derive>;
  childrenOf: (id: string) => string[];
  running: boolean;
}) {
  const a = state.agents.get(id);
  if (!a) return null;
  const kids = childrenOf(id);
  const finished = Boolean(a.stop || a.verdict) || (a.role === "planner" && state.showAudit);

  return (
    <li>
      <div className="flex min-w-0 items-center gap-2" style={{ paddingLeft: depth * 14 }}>
        {depth > 0 && <span className="text-white/20" aria-hidden>└</span>}
        <StatusIcon finished={finished} running={running} />
        <span className={cn("shrink-0", a.role === "evaluator" ? "text-violet-300/90" : "text-white/85")}>{a.id}</span>
        {a.topic && <span className="min-w-0 truncate text-white/40">{a.topic}</span>}
        <span className="ml-auto shrink-0 pl-2 text-right">
          {a.verdict ? (
            <span className={cn("rounded px-1.5 py-px text-[10px] font-semibold", verdictBadge(a.verdict))}>{a.verdict}</span>
          ) : a.stop === "max_iterations" || a.stop === "no_tool_calls" ? (
            <span className="text-[10px] text-amber-300/90">salvaged</span>
          ) : a.calls > 0 ? (
            <span className="text-[10px] text-white/35">{a.calls} {a.calls === 1 ? "call" : "calls"}</span>
          ) : null}
        </span>
      </div>
      {kids.length > 0 && (
        <ul className="mt-1 space-y-1">
          {kids.map((k) => (
            <AgentRow key={k} id={k} depth={depth + 1} state={state} childrenOf={childrenOf} running={running} />
          ))}
        </ul>
      )}
    </li>
  );
}

function StatusIcon({ finished, running }: { finished: boolean; running: boolean }) {
  if (finished) {
    return <Check size={12} className="shrink-0 text-emerald-400" aria-label="finished" />;
  }
  return (
    <span
      aria-label="running"
      className={cn("h-2 w-2 shrink-0 rounded-full bg-cyan-400", running && "motion-safe:animate-pulse")}
    />
  );
}

function verdictBadge(v: string) {
  if (v === "PASS") return "bg-emerald-400/15 text-emerald-300";
  if (v === "WEAK") return "bg-amber-400/15 text-amber-300";
  return "bg-rose-400/15 text-rose-300";
}
