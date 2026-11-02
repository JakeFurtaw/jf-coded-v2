// Generated from Dossier runs/Best_Run.md (a real local run) by parsing the saved trace with
// Dossier's own replay parser; the citation audit is Dossier's deterministic checker on the
// saved final answer. Pacing in the UI is compressed; the real run took durationSec.

export type ReplayEvent =
  | { t: "spawn"; agent: string; role: string; parent?: string; topic?: string; note?: string }
  | { t: "tool"; agent: string; tool: string; arg: string }
  | { t: "verdict"; agent: string; verdict: string }
  | { t: "note"; agent: string; text: string }
  | { t: "stop"; agent: string; reason: string };

export const dossierReplay: {
  goal: string;
  model: string;
  durationSec: number;
  events: ReplayEvent[];
  audit: { url: string; verified: boolean; seenIn: string[] }[];
} = {
  "goal": "What is the best agent framework to build a new AI Agent on in 2026? I am looking at Langchain and Llama Index mainly, but I am open to trying others. What are the benefits and drawbacks of each?",
  "model": "qwen3.8 (local, via Ollama)",
  "durationSec": 210.8,
  "events": [
    {
      "t": "spawn",
      "agent": "planner-1",
      "role": "planner"
    },
    {
      "t": "tool",
      "agent": "planner-1",
      "tool": "spawn_researchers",
      "arg": "3 parallel tasks"
    },
    {
      "t": "spawn",
      "agent": "researcher-1",
      "role": "researcher",
      "parent": "planner-1",
      "topic": "LlamaIndex"
    },
    {
      "t": "spawn",
      "agent": "researcher-2",
      "role": "researcher",
      "parent": "planner-1",
      "topic": "LangChain / LangGraph"
    },
    {
      "t": "spawn",
      "agent": "researcher-3",
      "role": "researcher",
      "parent": "planner-1",
      "topic": "Other frameworks"
    },
    {
      "t": "tool",
      "agent": "researcher-3",
      "tool": "web_search",
      "arg": "best AI agent frameworks 2026 alternatives to LangChain LlamaIndex CrewAI AutoGen OpenAI Agents SDK comparison"
    },
    {
      "t": "tool",
      "agent": "researcher-3",
      "tool": "web_search",
      "arg": "CrewAI vs AutoGen vs Pydantic AI vs smolagents vs LangGraph 2025 comparison pros cons"
    },
    {
      "t": "tool",
      "agent": "researcher-1",
      "tool": "web_search",
      "arg": "LlamaIndex 2025 AI agent framework LlamaCloud latest version"
    },
    {
      "t": "tool",
      "agent": "researcher-1",
      "tool": "web_search",
      "arg": "LlamaIndex vs LangChain vs LangGraph agent framework comparison 2025"
    },
    {
      "t": "tool",
      "agent": "researcher-2",
      "tool": "web_search",
      "arg": "LangChain 1.0 LangGraph 2025 release features stateful agents"
    },
    {
      "t": "tool",
      "agent": "researcher-2",
      "tool": "web_search",
      "arg": "LangChain LangGraph criticism drawbacks abstraction complexity breaking changes 2025"
    },
    {
      "t": "tool",
      "agent": "researcher-1",
      "tool": "browse_page",
      "arg": "addepto.com/blog/langchain-vs-llamaindex-main-differences"
    },
    {
      "t": "tool",
      "agent": "researcher-1",
      "tool": "browse_page",
      "arg": "respan.ai/articles/llamaindex-vs-langchain"
    },
    {
      "t": "tool",
      "agent": "researcher-3",
      "tool": "browse_page",
      "arg": "pickaxe.co/post/crewai-vs-langgraph-vs-autogen"
    },
    {
      "t": "tool",
      "agent": "researcher-3",
      "tool": "web_search",
      "arg": "OpenAI Agents SDK vs Semantic Kernel vs Pydantic AI vs smolagents vs Mastra 2026 best AI agent framework"
    },
    {
      "t": "tool",
      "agent": "researcher-2",
      "tool": "browse_page",
      "arg": "langchain.com/blog/langchain-langgraph-1dot0"
    },
    {
      "t": "tool",
      "agent": "researcher-2",
      "tool": "browse_page",
      "arg": "shashankguda.medium.com/challenges-criticisms-of-langchain-b26afcef94e7"
    },
    {
      "t": "tool",
      "agent": "researcher-1",
      "tool": "web_search",
      "arg": "LlamaIndex 0.12 0.13 version release 2025 LlamaCloud LlamaParse LlamaAgents"
    },
    {
      "t": "tool",
      "agent": "researcher-1",
      "tool": "browse_page",
      "arg": "techcrunch.com/2025/03/04/llamaindex-launches-a-cloud-service-for-building-unstructed-data-agents"
    },
    {
      "t": "tool",
      "agent": "researcher-3",
      "tool": "browse_page",
      "arg": "agentmail.to/blog/best-ai-agent-frameworks-2026"
    },
    {
      "t": "tool",
      "agent": "researcher-3",
      "tool": "browse_page",
      "arg": "deepresearch.ninja/2026/06/AI-Agent-Frameworks-in-2026-A-Comprehensive-Comparison"
    },
    {
      "t": "tool",
      "agent": "researcher-2",
      "tool": "web_search",
      "arg": "LangGraph 1.0 durable execution checkpoints human-in-the-loop LangSmith observability tracing"
    },
    {
      "t": "tool",
      "agent": "researcher-2",
      "tool": "web_search",
      "arg": "LangChain vs LlamaIndex vs CrewAI vs AutoGen vs OpenAI Agents SDK 2025 comparison"
    },
    {
      "t": "tool",
      "agent": "researcher-1",
      "tool": "browse_page",
      "arg": "github.com/run-llama/llama_index"
    },
    {
      "t": "tool",
      "agent": "researcher-3",
      "tool": "browse_page",
      "arg": "youngju.dev/blog/culture/2026-05-16-ai-agent-frameworks-2026-langgraph-autogen-crewai-semantic-kernel-openai-agents-claude-sdk-pydantic-ai-deep-dive.en"
    },
    {
      "t": "tool",
      "agent": "researcher-1",
      "tool": "report_findings",
      "arg": ""
    },
    {
      "t": "stop",
      "agent": "researcher-1",
      "reason": "stop_tool"
    },
    {
      "t": "spawn",
      "agent": "evaluator-1",
      "role": "evaluator",
      "parent": "researcher-1"
    },
    {
      "t": "tool",
      "agent": "researcher-2",
      "tool": "report_findings",
      "arg": ""
    },
    {
      "t": "stop",
      "agent": "researcher-2",
      "reason": "stop_tool"
    },
    {
      "t": "spawn",
      "agent": "evaluator-2",
      "role": "evaluator",
      "parent": "researcher-2"
    },
    {
      "t": "tool",
      "agent": "researcher-3",
      "tool": "browse_page",
      "arg": "devtoollab.com/blog/best-ai-agent-frameworks"
    },
    {
      "t": "tool",
      "agent": "researcher-3",
      "tool": "web_search",
      "arg": "Semantic Kernel Agent Framework 2026 benefits drawbacks .NET Python Java"
    },
    {
      "t": "verdict",
      "agent": "evaluator-1",
      "verdict": "PASS"
    },
    {
      "t": "verdict",
      "agent": "evaluator-2",
      "verdict": "PASS"
    },
    {
      "t": "note",
      "agent": "researcher-3",
      "text": "Reached max iterations (6)."
    },
    {
      "t": "stop",
      "agent": "researcher-3",
      "reason": "max_iterations"
    },
    {
      "t": "spawn",
      "agent": "evaluator-3",
      "role": "evaluator",
      "parent": "researcher-3"
    },
    {
      "t": "verdict",
      "agent": "evaluator-3",
      "verdict": "FAIL"
    },
    {
      "t": "spawn",
      "agent": "researcher-4",
      "role": "researcher",
      "parent": "planner-1",
      "topic": "Other frameworks (retry)",
      "note": "retry of researcher-3"
    },
    {
      "t": "tool",
      "agent": "researcher-4",
      "tool": "web_search",
      "arg": "best AI agent frameworks 2026 comparison CrewAI AutoGen OpenAI Agents SDK Semantic Kernel Pydantic AI"
    },
    {
      "t": "tool",
      "agent": "researcher-4",
      "tool": "web_search",
      "arg": "Microsoft Semantic Kernel 2025 benefits drawbacks multi-agent framework review"
    },
    {
      "t": "tool",
      "agent": "researcher-4",
      "tool": "browse_page",
      "arg": "xpay.sh/blog/article/top-ai-agent-frameworks"
    },
    {
      "t": "tool",
      "agent": "researcher-4",
      "tool": "browse_page",
      "arg": "leobit.com/blog/an-overview-of-microsoft-agent-framework-and-its-business-value"
    },
    {
      "t": "tool",
      "agent": "researcher-4",
      "tool": "browse_page",
      "arg": "alicelabs.ai/en/insights/open-source-ai-agent-frameworks-comparison-2026"
    },
    {
      "t": "tool",
      "agent": "researcher-4",
      "tool": "browse_page",
      "arg": "findly.dev/blog/top-ai-agent-frameworks-2026"
    },
    {
      "t": "tool",
      "agent": "researcher-4",
      "tool": "web_search",
      "arg": "smolagents Hugging Face vs Mastra TypeScript agent framework 2026 pros cons"
    },
    {
      "t": "tool",
      "agent": "researcher-4",
      "tool": "web_search",
      "arg": "CrewAI LangGraph AutoGen Pydantic AI drawbacks limitations criticism 2025"
    },
    {
      "t": "note",
      "agent": "researcher-4",
      "text": "Stopped: two consecutive responses with no tool call."
    },
    {
      "t": "stop",
      "agent": "researcher-4",
      "reason": "no_tool_calls"
    },
    {
      "t": "spawn",
      "agent": "evaluator-4",
      "role": "evaluator",
      "parent": "researcher-4"
    },
    {
      "t": "verdict",
      "agent": "evaluator-4",
      "verdict": "WEAK"
    },
    {
      "t": "tool",
      "agent": "planner-1",
      "tool": "spawn_researcher",
      "arg": ""
    },
    {
      "t": "spawn",
      "agent": "researcher-5",
      "role": "researcher",
      "parent": "planner-1",
      "topic": "Alternatives synthesis"
    },
    {
      "t": "tool",
      "agent": "researcher-5",
      "tool": "web_search",
      "arg": "best AI agent frameworks 2026 comparison CrewAI AutoGen OpenAI Agents SDK Pydantic AI smolagents Mastra"
    },
    {
      "t": "tool",
      "agent": "researcher-5",
      "tool": "web_search",
      "arg": "LangChain alternatives 2025 agent framework comparison Semantic Kernel Microsoft Agent Framework"
    },
    {
      "t": "tool",
      "agent": "researcher-5",
      "tool": "browse_page",
      "arg": "langfuse.com/blog/2025-03-19-ai-agent-comparison"
    },
    {
      "t": "tool",
      "agent": "researcher-5",
      "tool": "browse_page",
      "arg": "channel.tel/blog/ai-agent-frameworks-compared-2026-what-ships"
    },
    {
      "t": "tool",
      "agent": "researcher-5",
      "tool": "browse_page",
      "arg": "agentmail.to/blog/best-ai-agent-frameworks-2026"
    },
    {
      "t": "tool",
      "agent": "researcher-5",
      "tool": "report_findings",
      "arg": ""
    },
    {
      "t": "stop",
      "agent": "researcher-5",
      "reason": "stop_tool"
    },
    {
      "t": "spawn",
      "agent": "evaluator-5",
      "role": "evaluator",
      "parent": "researcher-5"
    },
    {
      "t": "verdict",
      "agent": "evaluator-5",
      "verdict": "PASS"
    },
    {
      "t": "note",
      "agent": "planner-1",
      "text": "Writing final_answer from researcher reports (no tool call from planner)."
    },
    {
      "t": "tool",
      "agent": "planner-1",
      "tool": "final_answer",
      "arg": ""
    },
    {
      "t": "stop",
      "agent": "planner-1",
      "reason": "stop_tool"
    }
  ],
  "audit": [
    {
      "url": "https://www.langchain.com/blog/langchain-langgraph-1dot0",
      "verified": true,
      "seenIn": [
        "web_search",
        "browse_page",
        "researcher report"
      ]
    },
    {
      "url": "https://thehackernews.com/2026/03/langchain-langgraph-flaws-expose-files.html",
      "verified": true,
      "seenIn": [
        "web_search",
        "researcher report"
      ]
    },
    {
      "url": "https://shashankguda.medium.com/challenges-criticisms-of-langchain-b26afcef94e7",
      "verified": true,
      "seenIn": [
        "web_search",
        "browse_page",
        "researcher report"
      ]
    },
    {
      "url": "https://github.com/run-llama/llama_index",
      "verified": true,
      "seenIn": [
        "browse_page",
        "researcher report"
      ]
    },
    {
      "url": "https://addepto.com/blog/langchain-vs-llamaindex",
      "verified": false,
      "seenIn": []
    },
    {
      "url": "https://respan.ai/llamaindex",
      "verified": false,
      "seenIn": []
    }
  ]
};
