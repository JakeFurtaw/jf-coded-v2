/**
 * System architecture diagrams for case study pages, keyed by project id.
 * Rendered by components/ui/architecture-diagram.tsx.
 *
 * Node kinds drive color and the legend:
 *   llm  – model-driven step (an LLM decides)
 *   code – deterministic code (no model call)
 *   data – service, store, or external resource
 */
export type ArchNodeKind = "llm" | "code" | "data";

export interface ArchNode {
  title: string;
  detail: string;
  kind: ArchNodeKind;
}

export interface ArchStage {
  label: string;
  nodes: ArchNode[];
  /** Shown as a "×N in parallel" badge on the stage. */
  parallel?: string;
}

export interface ArchSpec {
  intro: string;
  stages: ArchStage[];
  /** Feedback paths that don't fit a left-to-right flow. */
  loops?: string[];
}

export const architectures: Record<number, ArchSpec> = {
  // Cloak AI 2.0
  1: {
    intro:
      "Three local processes. The browser runs the agent loop and talks to Ollama directly; FastAPI hosts the tools and never proxies the model.",
    stages: [
      {
        label: "Interface",
        nodes: [
          { title: "React 19 UI", detail: "Chat, Agent Activity trace, knowledge bases, market desk", kind: "data" },
        ],
      },
      {
        label: "Agent loop",
        nodes: [
          { title: "Tool-calling loop", detail: "Runs in the browser; plans, calls tools, streams every step", kind: "llm" },
          { title: "Ollama", detail: "Local models, 256k context, dynamic switching", kind: "llm" },
        ],
      },
      {
        label: "Local services",
        nodes: [
          { title: "FastAPI tools", detail: "Search, browse, RAG, parsing, weather, markets, memory", kind: "code" },
          { title: "Code sandbox", detail: "Isolated container for run_python / run_typescript", kind: "code" },
        ],
      },
      {
        label: "Data & egress",
        nodes: [
          { title: "ChromaDB + bge-m3", detail: "Named collections, reranked retrieval", kind: "data" },
          { title: "SSRF guard → web", detail: "Every outbound fetch is checked first", kind: "code" },
        ],
      },
    ],
    loops: [
      "Each tool result returns to the loop until the model writes its answer",
      "Post-turn memory distillation keeps only facts the user stated",
    ],
  },

  // Dossier
  12: {
    intro:
      "A planner fans research out to parallel agents, an evaluator grades each report, and code, not a model, checks every citation at the end.",
    stages: [
      {
        label: "Plan",
        nodes: [{ title: "Planner", detail: "Explicit ReAct loop decomposes the goal", kind: "llm" }],
      },
      {
        label: "Research",
        parallel: "×3",
        nodes: [
          { title: "Researchers", detail: "web_search + browse_page; shared ledger and per-run cache", kind: "llm" },
        ],
      },
      {
        label: "Grade",
        nodes: [{ title: "Evaluator", detail: "Scores each report PASS / WEAK / FAIL", kind: "llm" }],
      },
      {
        label: "Synthesize",
        nodes: [{ title: "Planner", detail: "Writes the final answer from graded reports", kind: "llm" }],
      },
      {
        label: "Verify",
        nodes: [{ title: "Citation audit", detail: "Every cited URL traced to tool output; no model call", kind: "code" }],
      },
      {
        label: "Record",
        nodes: [{ title: "Run report", detail: "Markdown trace in runs/, replayable offline", kind: "data" }],
      },
    ],
    loops: [
      "FAIL → the researcher is retried once",
      "WEAK → the planner can spawn a focused follow-up researcher",
      "Hit an iteration cap → salvage still returns the gathered evidence",
    ],
  },
};
