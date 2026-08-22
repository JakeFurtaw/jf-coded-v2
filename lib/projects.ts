export interface Project {
  id: number;
  title: string;
  description: string; // Short description for cards
  longDescription: string;
  images?: Array<{
    src: string;
    caption?: string; // Shown in the fullscreen lightbox
  }>;
  github?: string;
  live?: string;
  category: "AI/ML" | "Web";
  subCategory?: string[];
  technologies: string[];

  // Timeline / status info shown in the project modal
  dateInfo?: {
    label: string;   // e.g. "Built in", "In active development since", "Released"
    value: string;   // e.g. "2023", "January-March 2026", "May 2026"
  };

  // Richer storytelling (optional)
  story?: {
    role?: string;
    context?: string;
    challenges?: string;
    approach?: string;
    learnings?: string;
    impact?: string;
  };
}

// Full project data - single source of truth
export const allProjects: Project[] = [
  {
    id: 1,
    title: "Cloak AI 2.0",
    description: "The second iteration of Cloak AI, a privacy-first, fully local AI agent with genuine tool use, mature RAG, and strong multimodal capabilities. Runs entirely on consumer hardware via Ollama with dynamic model switching, real-time agent transparency, named knowledge bases, and the ability to retrieve and display web images inline.",
    longDescription: "Cloak AI 2.0 is a fully local, privacy-first AI workspace built for real productivity. It runs on Ollama with seamless dynamic model switching and features reliable tool calling with exceptional transparency — every reasoning step and tool invocation is visible in real time inline and through the Agent Activity sidebar, while sources appear in a dedicated panel.\n\n" +
    "The agent can search the web, open a link you paste, pull a YouTube transcript, look up stocks and currency exchange rates, search your own documents, find images, and produce a weather forecast with an animated visualization. It will craft and plan and take multiple tool steps when a question needs them, and you can watch the plan unfold in realtime.\n\n" +
    "The system includes a proper RAG implementation using ChromaDB with bge-m3 embeddings, a reranker for better hits, and named collections that users can create, switch between, and manage directly from the UI. Documents can be added as one-shot context or ingested into persistent knowledge bases. Text files and Office docs are read locally; scanned PDFs go through NVIDIA Nemotron Parse.\n\n" +
    "Multimodal input is first-class: users can attach up to 5 images and documents in a single message (with drag & drop support), and the agent can reference previous images across turns using explicit labels. The agent can also search the web for images and display them inline in responses. Voice input uses Whisper Large v3 Turbo. Everything runs locally — chats never leave the machine.",
    images: [
      { src: "/projectImages/Cloak2.0/Cloak_Welcome.png", caption: "Main welcome screen featuring the dynamic model selector with support for Nemotron 3.5 and other local models." },
      { src: "/projectImages/Cloak2.0/Inline_Agent_Activity.png", caption: "Inline agent activity steps shown directly inside the chat interface during response generation." },
      { src: "/projectImages/Cloak2.0/Inline_Image.png", caption: "Inline image display within chat messages." },
      { src: "/projectImages/Cloak2.0/Knowledge_Base_Manager.png", caption: "Knowledge Base Manager interface for creating and managing named knowledge bases." },
      { src: "/projectImages/Cloak2.0/Attachments.png", caption: "Attachments panel for managing files and images in chat messages." },
      { src: "/projectImages/Cloak2.0/Chat_Interface.png", caption: "Full chat interface showing an example Weather tool response with inline forecast animation." },
      { src: "/projectImages/Cloak2.0/Agent_Activity.png", caption: "Agent Activity sidebar expanded, displaying the step-by-step reasoning trace and tool calls in real time." },
      { src: "/projectImages/Cloak2.0/Inline_Stock_Component.png", caption: "Inline stock component for displaying real-time market information." },

    ],
    category: "AI/ML",
    subCategory: ["Agentic", "Multimodal", "Developer Tools", "RAG & Retrieval"],
    technologies: [
      "React 19 + TypeScript",
      "Python + FastAPI",
      "Ollama",
      "Nemotron 3.5",
      "NVIDIA Nemotron Parse",
      "Whisper Large v3 Turbo",
      "Earth2Studio + FuXi + GFS",
      "ChromaDB + bge-m3 + reranker",
      "Playwright + Trafilatura + DDGS",
      "Custom tool/skill design",
      "Tailwind CSS",
    ],
    github: "https://github.com/JakeFurtaw",
    dateInfo: {
      label: "In active development since ",
      value: "May 2026 - Present",
    },
    story: {
      role: "Sole developer and system architect for the entire platform.",
      context: "After shipping the first version of Cloak AI, I quickly realized the rapid progress in local models and tooling meant the project needed a full evolution rather than incremental updates. The goal for 2.0 was to build something I would actually use daily — with real tool reliability, proper long-term memory via RAG, and excellent observability.",
      challenges: "Making tool calling reliable and transparent with smaller local models was difficult. Building a usable named-collection RAG system (with proper UI) took significant iteration. Adding first-class multimodal input (mixed images + documents, drag & drop, and multi-turn image referencing) while keeping the experience clean required careful state and prompt engineering. Image segmentation was powerful but buried the chat agent, so it moved to its own project.",
      approach: "I kept the solid FastAPI + Ollama foundation but did a major frontend and capability overhaul. Key additions include dynamic model switching, a full RAG system with named collections and management UI, multi-step tool use (search, browse, YouTube, stocks, weather), better document understanding, and significantly improved Agent Activity visualization for live reasoning and tool traces.",
      learnings: "Local models have improved dramatically in tool use and instruction following over just a few months. The biggest leap in user trust didn't come from model size — it came from radical transparency (showing every step) and giving users real control over memory (named RAG collections).",
      impact: "Cloak AI 2.0 became my primary daily AI tool. It proved that a high-quality, private, multimodal agent with useful tool use and memory is not only possible today on consumer hardware — it's genuinely pleasant to use.",
    },
  },
  
  {
    id: 11,
    title: "Cloak AI Image Segmentation",
    description: "Standalone React + FastAPI interface for prompt-based local image segmentation with a fine-tuned SAM3 model, plus satellite imagery segmentation powered by Google Earth Engine (Sentinel-2) and voice input.",
    longDescription:
      "This is the extracted standalone version of the image segmentation capabilities from Cloak AI. It provides a dedicated, full-featured interface for both general photo segmentation and satellite image analysis.\n\n" +
      "Local mode lets you upload any image and provide a text prompt (e.g. \"person\", \"car\", \"building\") to the fine-tuned SAM3 model, which returns precise mask overlays.\n\n" +
      "Satellite mode accepts latitude, longitude, and buffer size, fetches recent Sentinel-2 imagery via Google Earth Engine, and runs the same SAM3 model against it for tasks like building or road detection.\n\n" +
      "Includes voice input via Whisper-large-v3-turbo for hands-free prompting, a clean dark UI with sidebar history, dual-pane original vs segmented results, and mode switching between local and satellite workflows. The backend is a lightweight FastAPI service that handles the model inference and Earth Engine integration.",
      images: [
        { src: "/projectImages/SAM3_Img_Seg/Homepage.png", caption: "Initial view of the Cloak AI Image Segmentation tool in Local Image mode with upload area and prompt input." },
        { src: "/projectImages/SAM3_Img_Seg/Computer_Mouse_Seg.png", caption: "Local image segmentation example: computer mouse detected and masked from a real-world desk photo using SAM3." },
        { src: "/projectImages/SAM3_Img_Seg/Land_Sat_Seg.png", caption: "Satellite mode segmentation of a mine feature in Sentinel-2 imagery with coordinate inputs and mask overlay." },
        { src: "/projectImages/SAM3_Img_Seg/Mine_Seg.png", caption: "Prompt-based SAM3 segmentation of a large open-pit mine site from satellite imagery with high-confidence mask." },
      ],
    category: "AI/ML",
    subCategory: ["Computer Vision/Generative AI"],
    technologies: [
      "SAM3 (fine-tuned)",
      "Google Earth Engine",
      "FastAPI",
      "Label Studio",
      "Python",
      "React 19 + TypeScript",
      "Tailwind CSS",
      "Vite",
      "Sentinel-2 / Landsat",
      "Whisper Large v3 Turbo",
      "PyTorch",
      "Pillow + Matplotlib",
    ],
    github: "https://github.com/JakeFurtaw",
    dateInfo: {
      label: "Built from ",
      value: "Nov 2025 - March 2026",
    },
    story: {
      role: "Sole developer — extracted, polished, and packaged the segmentation UI and backend as an independent tool.",
      context: "The image segmentation features inside Cloak AI were powerful but buried inside the main chat agent. I wanted a focused, reusable interface that could be used standalone or re-integrated easily.",
      challenges: "Ensuring the SAM3 fine-tune and Earth Engine auth worked reliably outside the original monolith, plus making the dual-mode UI (local upload vs lat/lon satellite) intuitive and robust to bad inputs.",
      approach: "Pulled out only the necessary components (Sidebar, inputs, displays, voice) into a minimal Vite + React shell with a dedicated FastAPI backend. Kept the exact same segmentation and STT endpoints.",
      learnings: "Modular extraction forces cleaner boundaries. Having a purpose-built UI for one capability makes the feature much more usable and easier to demo or iterate on independently. Label Studio was essential for efficient, high-quality data marking—creating precise point and polygon annotations across diverse natural images and Sentinel-2 satellite scenes—which directly enabled successful SAM3 finetuning. The finetuning process underscored how sensitive promptable segmentation models are to annotation quality, prompt diversity, and hard-negative examples; small improvements in the training set produced outsized gains in mask precision on both everyday objects and remote-sensing targets.",
      impact: "Created a clean, focused tool for SAM3-based segmentation that can run independently of the full agent, useful for research, demos, and quick satellite analysis tasks.",
    },
  },
  {
    id: 3,
    title: "Agent Qwen",
    description:
      "Multimodal AI agent designed to emulate a Geek Squad Consultation Agent. Built on Qwen2.5-Omni-7B that can understand and respond with text, images, audio, and video. Designed as a Geek Squad-style troubleshooting assistant with voice output.",
    longDescription:
      "Agent Qwen is a multimodal interface built around Alibaba's Qwen2.5-Omni-7B model, which natively handles text, image, audio, and video inputs while generating both text responses and spoken audio output. The agent is role-played as a professional Geek Squad consultant through a carefully engineered system prompt that guides it to gather device issues, ask clarifying questions, and produce structured troubleshooting reports.\n\n" +
      "User voice input is captured through Gradio and transcribed with Whisper-large-v3-turbo when needed. The Qwen-Omni model then generates responses that can be spoken back to the user using one of its built-in voices (currently 'Ethan'). The entire experience runs locally with a clean black-and-orange Geek Squad themed Gradio interface.",
    images: [
      { src: "/projectImages/AgentQwen/StartScreen.png", caption: "Starting screen of the Multimodal Agent Qwen Gradio interface for device troubleshooting." },
      { src: "/projectImages/AgentQwen/ActivateChat.png", caption: "Active Multimodal conversation with the Qwen 2.5-Omni agent processing user input." },
    ],
    category: "AI/ML",
    subCategory: ["Multimodal"],
    technologies: [
      "Python",
      "Qwen2.5-Omni-7B",
      "Gradio",
      "Whisper Large v3 Turbo",
      "PyTorch",
      "Transformers",
      "Hugging Face",
    ],
    github: "https://github.com/JakeFurtaw/Agent-Qwen",
    live: "https://www.youtube.com/watch?v=dCSDCVwJvcA",
    dateInfo: {
      label: "Built from ",
      value: "May 2025 - June 2025",
    },

    story: {
      role: "Sole developer — designed and built both the model pipeline and the Gradio interface.",
      context: "I wanted to explore what a local Multimodal could feel like in a real-world support scenario.",
      challenges: "This was my first time working with an Omni model. At the time documentation was limited, and coordinating audio, vision, and text in one agent while keeping latency acceptable and the system prompt effective was complex.",
      approach: "Used Qwen 2.5-Omni with custom tooling around Whisper and FastRTC, plus a carefully engineered system prompt for professional troubleshooting.",
      learnings: "Multimodal systems are extremely powerful,but the technology is still evolving and needs more research.",
      impact: "Created one of the most impressive local demos I’ve built and gained deep intuition about Multimodal models.",
    },
  },
  {
    id: 4,
    title: "Cloak AI",
    description: "A privacy-first, locally-hosted AI powerhouse designed for secure, sophisticated task automation. Cloak AI leverages Nemotron Nano 3 as the default model via Ollama to provide advanced language processing without data ever leaving the local environment.",
    longDescription:
      "A privacy-first, locally-hosted AI powerhouse designed for secure, sophisticated task automation. Cloak AI leverages Nemotron Nano 3 via Ollama to provide advanced language processing without data ever leaving the local environment. Built with a FastAPI backend and React frontend, it features real-time response streaming, persistent local history, and an expansive toolset—ranging from Yahoo Finance and GFS weather data to high-end multimodal capabilities like Whisper transcription and SAM3 satellite image segmentation. Experience the power of a modern AI agent with the security of a closed-loop system.",
    images: [
      { src: "/projectImages/Cloak/ChatPage.png", caption: "Main chat landing page of the original Cloak AI with quick action cards and Deep Search mode toggle." },
      { src: "/projectImages/Cloak/ImgSegPage.png", caption: "Local image segmentation interface with upload area and prompt input for object detection." },
      { src: "/projectImages/Cloak/ActivateChat.png", caption: "Active chat session showing a detailed response with sources and deep research output." },
      { src: "/projectImages/Cloak/ImgSegSat.png", caption: "Satellite image segmentation mode with coordinate inputs (latitude, longitude, buffer size)." },
    ],
    category: "AI/ML",
    subCategory: ["Agentic", "Multimodal"],
    technologies: [
      "Python",
      "Nemotron Nano 3",
      "Ollama",
      "React",
      "TypeScript",
      "FastAPI",
      "Tailwind CSS",
      "Earth 2 Studio",
      "GFS Weather Data",
      "Yahoo Finance API",
      "Whisper",
      "Nemotron Parse",
      "SAM3(Fine-tuned)",
      "Tool Use",
      "Web Scraping",
      "Geocoding",
      "Satellite Imagery",
    ],
    github: "https://github.com/JakeFurtaw",
    dateInfo: {
      label: "Built from ",
      value: "Dec 2025 - March 2026",
    },
      story: {
      role: "Sole developer and system architect for the entire platform.",
      context: "I wanted to build a powerful local AI agent that could use real tools without ever sending user data to the cloud.",
      challenges: "Getting reliable tool calling, streaming responses, and multimodal capabilities (especially SAM3 image segmentation) working locally with acceptable latency was very difficult.",
      approach: "I built a custom FastAPI backend with Nemotron Nano 3 via Ollama and designed a clean React frontend with real-time streaming and persistent local history.",
      learnings: "Local LLMs have come incredibly far. With the right prompting and tool design, you can build agents that feel genuinely capable while keeping everything private.",
      impact: "Became a core part of my daily workflow and proved that high-quality, private AI agents are very achievable today.",
    },
  },

  {
    id: 12,
    title: "Dossier",
    description:
      "A local multi-agent research runtime. A planner fans out parallel researchers, an evaluator retries weak reports, and every cited URL is checked against tool output — no extra model call.",
    longDescription:
      "Dossier is a local multi-agent research runtime built around an explicit ReAct loop. A planner decomposes a goal and delegates independent questions in one turn. Each researcher runs its own search-and-browse loop, then an evaluator scores the report PASS / WEAK / FAIL. A FAIL gets one extra pass before the planner synthesizes a final answer.\n\n" +
      "Researchers share a compact ledger of queries, URLs, and report summaries so later siblings and retries do not repeat work. Search and page fetches are cached per run. After the answer is written, every cited URL is checked against tool output with no extra model call. Unverified sources are flagged in the run report; a strict mode can fail the process if any URL does not trace back to evidence.\n\n" +
      "The terminal shows a live agent tree plus one-line tool actions. Full traces are saved as markdown under runs/ and can be replayed without calling the model. Everything runs locally through Ollama.",
    images: [
      { src: "/projectImages/Dossier/Live_Agents.png", caption: "Live agent tree: a planner with three parallel researchers, each scored PASS by a nested evaluator." },
      { src: "/projectImages/Dossier/Goal.png", caption: "Run header showing the local Ollama model, host, temperature, and the research goal." },
      { src: "/projectImages/Dossier/Citation_Audit.png", caption: "Citation audit of the final answer — 4/5 URLs traced to researcher tool output, one flagged as unverified." },
    ],
    category: "AI/ML",
    subCategory: ["Agentic", "Developer Tools"],
    technologies: [
      "Python",
      "LangChain",
      "Ollama",
      "Playwright",
      "Trafilatura",
      "DDGS",
      "Rich",
      "pytest",
    ],
    github: "https://github.com/JakeFurtaw/Dossier",
    dateInfo: {
      label: "In active development since ",
      value: "August 2026 - Present",
    },
    story: {
      role: "Sole developer — designed the planner / researcher / evaluator loop, citation checker, and live trace UI.",
      context: "I wanted a small, inspectable multi-agent system I could run locally — not a chat product, just a supervisor that fans out research and checks its own sources.",
      challenges: "Getting local models to actually call stop tools, share context across parallel researchers without duplicate searches, and verify citations without a second LLM pass.",
      approach: "Wrote an explicit ReAct loop instead of hiding the path in a graph runtime. Added a shared ledger, single-flight caches, a deterministic URL audit, and salvage/replay so a failed stop tool still leaves a usable report.",
      learnings: "Reliability work (evaluator retry, citation matching, fallbacks) mattered more than adding another role. Transparency in the live tree made it obvious when the planner was waiting versus when a researcher was stuck.",
      impact: "A compact local demo of multi-agent orchestration I can run, replay, and point to without standing up a full product UI.",
    },
  },
  {
    id: 2,
    title: "Chat RAG",
    description:
      "Advanced Retrieval-Augmented Generation (RAG) coding assistant with support for multiple LLMs, documents, and GitHub repositories.",
    longDescription:
      "Chat RAG is a Gradio-based RAG coding assistant built on Llama-Index. It supports dynamic model switching across Ollama (local), Hugging Face (with 2/4/8-bit quantization), NVIDIA NIM, OpenAI, and Anthropic, with per-provider model lists and extensive parameter controls (temperature, top-p, max tokens, context window, and custom system prompts).\n\n" +
      "Users can upload documents (PDF, DOCX, XLSX, code files, etc.) for context, with advanced parsing via LlamaParse when available. It also supports ingesting entire GitHub repositories using a personal access token. The system uses a local Hugging Face embedding model and implements streaming responses with model-aware chat memory.",
    images: [
      { src: "/projectImages/Chat-RAG/start_state.png", caption: "Initial state of the advanced RAG chat interface before any queries." },
      { src: "/projectImages/Chat-RAG/model_dropdown.png", caption: "Model selection dropdown showing support for multiple LLM providers (Ollama, OpenAI, Anthropic, etc.)." },
      { src: "/projectImages/Chat-RAG/query.png", caption: "RAG query in progress with document retrieval and streaming response." },
      { src: "/projectImages/Chat-RAG/RAG_Query.png", caption: "Example of a successful RAG query with retrieved context and cited sources." },
    ],
    category: "AI/ML",
    subCategory: ["RAG & Retrieval", "Developer Tools"],
    technologies: [
      "Python",
      "Llama-Index",
      "Gradio",
      "Ollama",
      "Hugging Face Transformers",
      "LlamaParse",
      "ChromaDB",
      "GitHub API",
      "OpenAI",
      "Anthropic",
      "NVIDIA NIM",
      "Milvus",
      "Neo4j",
      "Transformers",
    ],
    github: "https://github.com/JakeFurtaw/Chat-RAG",
    dateInfo: {
      label: "Built from ",
      value: "Aug 2024 - May 2025",
    },

    story: {
      role: "Sole developer — designed the full RAG architecture and built the Gradio interface.",
      context: "I needed a flexible local + cloud RAG system that could handle codebases, PDFs, and multiple vector stores without vendor lock-in.",
      challenges: "Managing multiple vector stores, dynamic model switching, and maintaining good retrieval quality across very different data types was non-trivial.",
      approach: "Built a highly modular pipeline using LlamaIndex + LangChain with support for Chroma, Milvus, Neo4j, and multiple LLM providers through a unified interface.",
      learnings: "The quality of retrieval and chunking strategy often matters more than the LLM itself. Good RAG is mostly an engineering problem.",
      impact: "This system became my primary research and coding assistant and significantly accelerated how I work with large codebases and documents.",
    },
  },
  {
    id: 5,
    title: "Auto Mutant Classifier",
    description:
      "An Abstract Syntax Tree Neural Network trained to detect equivalent mutants in Java and C++ code.",
    longDescription:
      "Built and trained an Abstract Syntax Tree Neural Network (ASTNN) to identify equivalent vs. non-equivalent mutants in Java and C++ source code. We built a custom parser to sort the unlabled train dataset into a fully labeled dataset. The model then classifies the mutant test set as equivalent or non-equivalent mutants. This work aims to significantly reduce the manual effort required in mutation testing by automating equivalence detection.",
    images: [
      { src: "/projectImages/AEMI/ASTNN_Flow_Chart.png", caption: "High-level architecture diagram of the Abstract Syntax Tree Neural Network (ASTNN) for mutant classification." },
      { src: "/projectImages/AEMI/ASTNN_Flow_Chart_2.png", caption: "Detailed flow of the ASTNN pipeline for detecting equivalent mutants in source code." },
      { src: "/projectImages/AEMI/code2vec_pipeline.png", caption: "code2vec embedding pipeline used as part of the mutant classification research." },
      { src: "/projectImages/AEMI/codeBERT_pipeline.png", caption: "CodeBERT-based pipeline explored during the equivalent mutant detection study." },
      { src: "/projectImages/AEMI/modded_astnn_pipeline.png", caption: "Final modified ASTNN architecture developed for the research project." },
    ],
    category: "AI/ML",
    subCategory: ["Research"],
    technologies: [
      "Python",
      "PyTorch",
      "Neural Networks",
      "Java",
      "C++",
      "Over/Undersampling",
      "Model Training & Optimization",
    ],
    github: "https://gitlab.com/JakeFurtaw/ASTNN-COSC490",
    dateInfo: {
      label: "Built from ",
      value: "Jan 2023 - May 2023",
    },
  },
  {
    id: 6,
    title: "Image Alter",
    description:
      "Gradio interface for local text-to-image generation using FLUX models, with extensive parameter controls and gallery management.",
    longDescription:
      "Image Alter is a Gradio-based local image generation tool built around Black Forest Labs' FLUX diffusion models. It provides a clean interface for text-to-image generation with fine-grained control over inference steps, guidance scale, resolution, seed, and number of outputs.\n\n" +
      "The app features a responsive dark UI with tabbed navigation, an advanced settings accordion, example prompts, live output gallery, and an accumulating output history with download/fullscreen support. Generation runs on GPU via the Diffusers library with proper memory management between runs.",
    images: [
      { src: "/projectImages/ImageAlter/advanced_options.png", caption: "Advanced generation settings panel in the Stable Diffusion / Flux image editing Gradio app." },
      { src: "/projectImages/ImageAlter/gen_imgs.png", caption: "Text-to-image generation results using fine-tuned Flux models." },
      { src: "/projectImages/ImageAlter/i2i_ss.png", caption: "Image-to-image transformation example within the Image Alter application." },
      { src: "/projectImages/ImageAlter/img_alt_ss.png", caption: "Main interface of the AI-powered image editing tool with prompt input." },
      { src: "/projectImages/ImageAlter/out_img_gal.png", caption: "Output gallery showing multiple generated and edited images side by side." },
    ],
    category: "AI/ML",
    subCategory: ["Computer Vision/Generative AI"],
    technologies: [
      "Python",
      "Gradio",
      "Diffusers",
      "Transformers",
      "PIL",
      "PyTorch",
      "FLUX",
      "Numpy",
    ],
    github: "https://github.com/JakeFurtaw/ImageAlter",
    dateInfo: {
      label: "Built from ",
      value: "Sept 2024 - Feb 2025",
    },
  },
  {
    id: 7,
    title: "Health Bot",
    description:
      "Personal health assistant chatbot with long-term conversational memory. Remembers past discussions across sessions using retrieval over chat history, with strong guardrails for health topics.",
    longDescription:
      "Health Bot is a Gradio-based conversational health assistant that maintains long-term memory across sessions by retrieving from a user's own previous chat history. It uses Llama-Index to convert past conversation turns into a temporary vector index, allowing the model (Ollama + Mistral-Nemo) to reference earlier context when responding.\n\n" +
      "The system includes a strong health-focused system prompt with clear guardrails, streaming responses, and dual JSON-based persistence for chat history. A simple username flow creates per-user sessions without requiring real authentication infrastructure.\n\n" +
      "Important: This is a general wellness conversation tool only. It does not contain a medical knowledge base and is not a substitute for professional healthcare advice.",
    images: [
      { src: "/projectImages/HealthG-Demo/ChatWindow.png", caption: "Main chat window of the personalized Health Bot RAG assistant." },
      { src: "/projectImages/HealthG-Demo/ChatbotWMemory.png", caption: "Health Bot conversation demonstrating memory and context retention across messages." },
      { src: "/projectImages/HealthG-Demo/WIthQuestionsAsked.png", caption: "Example interaction showing suggested health-related follow-up questions." },
    ],
    category: "AI/ML",
    subCategory: ["RAG & Retrieval"],
    technologies: [
      "Python",
      "Gradio",
      "Llama-Index",
      "Ollama",
      "Hugging Face Embeddings",
      "PyTorch",
    ],
    github: "https://github.com/JakeFurtaw/HealthReelDemo",
    dateInfo: {
      label: "Built from ",
      value: "July 2024 - Sept 2024",
    },
  },
  {
    id: 8,
    title: "Repo Ripper",
    description:
      "Lightweight CLI script for chatting with GitHub repositories using local Ollama models and Llama-Index retrieval.",
    longDescription:
      "Repo Ripper is a simple Python script that lets you query and chat with the contents of any GitHub repository using a local Ollama model. It uses Llama-Index’s GithubRepositoryReader to fetch files, builds a VectorStoreIndex with local Hugging Face embeddings, and supports both one-off queries and multi-turn conversations with memory.\n\n" +
      "File extension filtering is supported, and all processing happens locally after the initial repository fetch. Designed as a practical tool for quickly understanding unfamiliar codebases without sending code to cloud services.",
    category: "AI/ML",
    subCategory: ["RAG & Retrieval", "Developer Tools"],
    technologies: [
      "Python",
      "Llama-Index",
      "Ollama",
      "Hugging Face Embeddings",
      "GitHub API",
    ],
    github: "https://github.com/JakeFurtaw/RepoRipper",
    dateInfo: {
      label: "Built from ",
      value: "Aug 2024 - Sept 2024",
    },
  },
  {
    id: 9,
    title: "Oceans",
    description:
      "React web app built as a semester long project for my Web Development course.",
    longDescription:
      "This project is a web app built using the MERN stack. This was my groups semester long final project for my Web Development course at Towson University. The app is a mock social platform built to mimic Reddit and Facebook. It allows users to share and discuss content in a forum style layout as well as personal updates. It features user authentication, profile management, and content creation.",
    images: [
      { src: "/projectImages/Oceans/Oceans-Landing-Page.png", caption: "Landing page of the Oceans web application built with React and Node.js." },
      { src: "/projectImages/Oceans/Oceans-Homepage.png", caption: "Homepage view of the Oceans social platform after login." },
      { src: "/projectImages/Oceans/Oceans-Profile-Page.png", caption: "User profile page within the Oceans web application." },
      { src: "/projectImages/Oceans/Oceans-WebDev-Ocean-Page.png", caption: "Ocean detail page showcasing the core feature of the semester project." },
      { src: "/projectImages/Oceans/Oceans-Create-Account-Page.png", caption: "Account creation / registration screen for the Oceans platform." },
    ],
    category: "Web",
    technologies: ["Node.js", "React", "Express", "MongoDB"],
    github: "https://github.com/JakeFurtaw",
    dateInfo: {
      label: "Built from ",
      value: "Jan 2023 - May 2023",
    },
  },
  {
    id: 10,
    title: "Frontier Signal Partners Website",
    description: "Modern single page website for Frontier Signal Partners.",
    longDescription:
      "Built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and shadcn/ui.",
    images: [{ src: "/projectImages/FSPSite/FSPHomePage.png", caption: "Homepage of the Frontier Signal Partners professional website built with Next.js 15." }],
    category: "Web",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    github: "https://github.com/JakeFurtaw",
    live: "https://www.fspx.ai",
        dateInfo: {
      label: "Built from",
      value: "Apr 2026 - May 2026",
    },
  },
  {
    id: 13,
    title: "My Campus Hubs AI Assistant",
    description:
      "Campus RAG assistant for Towson students — answers questions about events, classes, and campus resources from a large scraped university knowledge base.",
    longDescription:
      "The AI engine behind My Campus Hubs (SurgePoint) — a retrieval-augmented student assistant serving accurate, on-demand campus information to over 15,000 students. We crawled 200M+ lines of Towson University’s public web and document corpus, curating it into a 13M-line knowledge base parsed via LlamaParse and custom HTML splitters, then indexed in Milvus using gte-large-en-v1.5 embeddings.\n\n" +
      "The system runs on a LlamaIndex retriever and a ReAct agent framework executing local inference across Mistral Instruct and Llama 3 models, backed by a ChromaDB fallback. To evaluate performance, we engineered a custom Towson QA benchmark to rigorously evaluate retrieval quality and prompt strategies. Awarded $1,000 in the Towson StartUp Cohort.\n\n",
    category: "AI/ML",
    subCategory: ["RAG & Retrieval"],
    technologies: [
      "Python",
      "LlamaIndex",
      "Milvus",
      "LlamaParse",
      "Ollama",
      "Mistral",
      "Llama 3",
      "ChromaDB",
      "Hugging Face Embeddings",
      "gte-large-en-v1.5",
      "ReAct Agent",
      "Web Scraping",
    ],
    github: "https://github.com/JakeFurtaw",
    dateInfo: {
      label: "Built from ",
      value: "Aug 2023 - Jan 2025",
    },
    story: {
      role: "Co-founder and ML engineer — owned the RAG pipeline, data collection, prompt design, and the streaming assistant API.",
      context: "Students at Towson had no single place to ask natural-language questions about campus life, courses, and resources. Search pages and PDFs existed, but they were scattered. We wanted an assistant that actually knew the university.",
      challenges: "The raw campus web dump was huge and noisy (200M+ lines). Getting retrieval quality high enough that answers were trustworthy — without hallucinating contact info or inventing events — this took a LOT of parsing and prompt iteration.",
      approach: "Scraped the Towson sitemap plus HTML and PDFs, parsed documents with LlamaParse, and stored embeddings in Milvus. Wrote Towson-specific system prompts so the model stayed in character, used context only when it was relevant, and refused to invent people or policies.",
      learnings: "Dataset hygiene mattered more than swapping models. A smaller, well-parsed campus corpus beat throwing the entire scrape at the index. Prompt rules (don't mention staff unless asked, don't prefix answers with 'based on the context') were what made it feel like a campus assistant instead of a RAG demo.",
      impact: "Served accurate campus information to 15,000+ students and won $1,000 in the Towson StartUp Cohort. This was the project that taught me how to take RAG from a notebook to something people actually used.",
    },
  },
];

// Curated featured projects for the homepage (order matters)
export const featuredProjectIds = [1, 2, 3] as const;

export function getFeaturedProjects() {
  return featuredProjectIds
    .map((id) => allProjects.find((p) => p.id === id))
    .filter(Boolean) as Project[];
}
