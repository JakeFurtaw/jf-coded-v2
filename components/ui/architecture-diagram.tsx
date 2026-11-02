"use client";

import { Fragment } from "react";
import { RotateCcw } from "lucide-react";
import type { ArchNode, ArchNodeKind, ArchSpec } from "@/lib/architectures";
import { cn } from "@/lib/utils";

const KIND: Record<ArchNodeKind, { label: string; border: string; dot: string }> = {
  llm: { label: "LLM step", border: "border-cyan-400/45", dot: "bg-cyan-400" },
  code: { label: "Deterministic code", border: "border-violet-400/45", dot: "bg-violet-400" },
  data: { label: "Service / data", border: "border-white/15", dot: "bg-white/50" },
};

export function ArchitectureDiagram({ spec }: { spec: ArchSpec }) {
  const kinds = (Object.keys(KIND) as ArchNodeKind[]).filter((k) =>
    spec.stages.some((s) => s.nodes.some((n) => n.kind === k)),
  );

  return (
    <figure className="glass rounded-2xl border border-white/10 p-5 md:p-7">
      <figcaption className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">{spec.intro}</p>
        <ul className="flex shrink-0 flex-wrap gap-x-4 gap-y-1.5 text-xs text-white/55" aria-label="Legend">
          {kinds.map((k) => (
            <li key={k} className="inline-flex items-center gap-1.5">
              <span className={cn("h-2 w-2 rounded-full", KIND[k].dot)} />
              {KIND[k].label}
            </li>
          ))}
        </ul>
      </figcaption>

      {/* Flow: vertical below lg, horizontal from lg */}
      <ol className="flex flex-col lg:flex-row lg:items-stretch">
        {spec.stages.map((stage, i) => (
          <Fragment key={`${stage.label}-${i}`}>
            {i > 0 && <Connector index={i} />}
            <li className="flex min-w-0 flex-col gap-2 lg:flex-1 lg:basis-0">
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                  {String(i + 1).padStart(2, "0")} · {stage.label}
                </span>
                {stage.parallel && (
                  <span
                    title="Runs in parallel"
                    className="whitespace-nowrap rounded-full border border-cyan-400/30 bg-cyan-400/10 px-1.5 py-px font-mono text-[10px] text-cyan-300"
                  >
                    {stage.parallel}
                    <span className="sr-only"> in parallel</span>
                  </span>
                )}
              </div>
              <div
                className={cn(
                  "grid gap-2",
                  stage.nodes.length > 1 ? "sm:grid-cols-2 lg:grid-cols-1" : "",
                )}
              >
                {stage.nodes.map((node) => (
                  <NodeCard key={node.title} node={node} stacked={Boolean(stage.parallel)} />
                ))}
              </div>
            </li>
          </Fragment>
        ))}
      </ol>

      {spec.loops && spec.loops.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5" aria-label="Feedback paths">
          {spec.loops.map((loop) => (
            <li
              key={loop}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/70"
            >
              <RotateCcw size={12} className="shrink-0 text-cyan-400" aria-hidden />
              {loop}
            </li>
          ))}
        </ul>
      )}
    </figure>
  );
}

function NodeCard({ node, stacked }: { node: ArchNode; stacked: boolean }) {
  const k = KIND[node.kind];
  return (
    <div className="relative h-full">
      {/* Offset "cards behind" hint for stages that run several agents in parallel */}
      {stacked && (
        <>
          <span aria-hidden className={cn("absolute inset-0 translate-x-2 translate-y-2 rounded-xl border bg-white/[0.02]", k.border)} />
          <span aria-hidden className={cn("absolute inset-0 translate-x-1 translate-y-1 rounded-xl border bg-white/[0.03]", k.border)} />
        </>
      )}
      <div className={cn("relative h-full rounded-xl border bg-[#101018] p-3", k.border)}>
        <div className="flex items-center gap-2">
          <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", k.dot)} aria-hidden />
          <span className="text-sm font-semibold tracking-tight text-white">{node.title}</span>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-white/60">{node.detail}</p>
        <span className="sr-only">({k.label})</span>
      </div>
    </div>
  );
}

/** Arrow between stages: vertical below lg, horizontal from lg, with a travelling dot. */
function Connector({ index }: { index: number }) {
  const delay = { animationDelay: `${index * 0.35}s` };
  return (
    <li aria-hidden className="relative flex shrink-0 items-center justify-center py-1 lg:w-8 lg:py-0">
      {/* vertical */}
      <span className="relative block h-6 w-px bg-gradient-to-b from-white/10 to-white/30 lg:hidden">
        <span
          className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-300 opacity-0 motion-safe:animate-[arch-flow-y_2.4s_linear_infinite] motion-reduce:hidden"
          style={delay}
        />
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-x-[4px] border-t-[5px] border-x-transparent border-t-white/35" />
      </span>
      {/* horizontal */}
      <span className="relative hidden h-px w-full bg-gradient-to-r from-white/10 to-white/30 lg:block">
        <span
          className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyan-300 opacity-0 motion-safe:animate-[arch-flow-x_2.4s_linear_infinite] motion-reduce:hidden"
          style={delay}
        />
        <span className="absolute -right-1 top-1/2 -translate-y-1/2 border-y-[4px] border-l-[5px] border-y-transparent border-l-white/35" />
      </span>
    </li>
  );
}
