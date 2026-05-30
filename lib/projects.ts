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
    description: "The second iteration of Cloak AI, a privacy-first, locally-hosted AI agent with real tool use, rich transparency, and serious multimodal capabilities. Runs entirely on consumer hardware via Ollama with dynamic model switching, high-quality document understanding, satellite imagery analysis, and voice input—never sending data off-device.",
    longDescription: "Cloak AI is a fully local, privacy-first AI agent built for real work. It runs on Ollama with dynamic switching across four strong models (Nemotron Nano 3 Omni as default) and features genuine tool calling with live transparency—every reasoning step and tool invocation is visible in real time through the Agent Activity panel, while sources are cleanly separated into a dedicated sidebar.\n\n" +
  "The backend is where it gets interesting: a FastAPI service powering advanced local capabilities including Whisper-large-v3-turbo for voice transcription, NVIDIA's Nemotron Parse model for high-accuracy PDF and image document extraction, and a fine-tuned SAM3 model for both general image segmentation and satellite imagery analysis via Google Earth Engine (Sentinel-2 and Landsat). Weather forecasting uses Earth2Studio with the FuXi model plus animated GFS visualizations. All of this runs locally with no data leaving the machine.",
    images: [
      { src: "/projectImages/Cloak2.0/Cloak_Welcome.png", caption: "Main welcome screen featuring the dynamic model selector with support for Nemotron Nano 3 Omni and other local models." },
      { src: "/projectImages/Cloak2.0/Chat_Interface.png", caption: "Full chat interface showing a detailed AI response with the Agent Activity button and Sources panel enabled." },
      { src: "/projectImages/Cloak2.0/Agent_Activity.png", caption: "Agent Activity sidebar expanded, displaying the step-by-step reasoning trace and tool calls in real time." },
      { src: "/projectImages/Cloak2.0/Inline_Agent_Activity.png", caption: "Inline agent reasoning steps shown directly inside a chat message during response generation." },
    ],
    category: "AI/ML",
    subCategory: ["Agentic", "Multimodal", "Developer Tools"] ,
    technologies: [
      "Python",
      "FastAPI",
      "React 19",
      "TypeScript",
      "Ollama",
      "Nemotron Nano 3 Omni",
      "NVIDIA Nemotron Parse",
      "Whisper Large v3 Turbo",
      "SAM3 (fine-tuned)",
      "Earth2Studio + FuXi",
      "Google Earth Engine",
      "Yahoo Finance",
      "Playwright + Trafilatura",
      "Tailwind CSS",
    ],
    github: "https://github.com/JakeFurtaw",
    dateInfo: {
      label: "In active development since",
      value: "May 2026",
    },
    story: {
      role: "Sole developer and system architect for the entire platform.",
      context: "I was happy with the first iteration of Cloak AI but I knew there was room for improvement. This version was a complete rewrite to integrate the new Omni model along with dynamic model switching to let the user choose which model they want to use, add more tools and upgrade current tool functionality, and significantly modernize the UI/UX.",
      challenges: "Integrating the new Omni model required significant backend modifications. The new and improved web search tool was a major undertaking, and getting reliable tool calling with live transparency working smoothly was also difficult.",
      approach: "Using the skeleton of the original software I did a full frontend overhaul, and major backend renovations. The new version integrates Dynamic model switching adding more model options, a new an improved web search tool, live agent reasoning outputs, agent activity button for agent timeline. ",
      learnings: "LLM post training has come a long way in the past few months. When I revisited Cloak just a few months after \"finishing\" the first version, it became aparent the tool needed a total overhaul to reach its full potential.",
      impact: "Became a core part of my daily workflow and proved that high-quality, private AI agents are very achievable today.",
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
      "SAM3",
      "Tool Use",
      "Web Scraping",
      "Geocoding",
      "Satellite Imagery",
    ],
    github: "https://github.com/JakeFurtaw",
    dateInfo: {
      label: "Built from ",
      value: "January to March 2026",
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
      value: "2024 to 2025",
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
      value: "2023 to 2024",
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
      "Built and trained an Abstract Syntax Tree Neural Network (ASTNN) to identify equivalent vs. non-equivalent mutants in Java and C++ source code. The model sorts an unlabeled dataset of equivalent and non-equivalent mutants into a labeled dataset automatically. This work aims to significantly reduce the manual effort required in mutation testing by automating equivalence detection.",
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
      label: "Built in",
      value: "2023",
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
      "PyTorch",
      "FLUX.1",
      "Transformers",
    ],
    github: "https://github.com/JakeFurtaw/ImageAlter",
    dateInfo: {
      label: "Built in",
      value: "2024",
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
      label: "Built in",
      value: "2024",
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
  },
  {
    id: 9,
    title: "Oceans",
    description:
      "React web app built as a semester long project for my Web Development course.",
    longDescription:
      "React web app built as a semester long project for my Web Development course at Towson University.",
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
      label: "Built in",
      value: "2023",
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
  },
];

// Curated featured projects for the homepage (order matters)
export const featuredProjectIds = [1, 2, 3] as const;

export function getFeaturedProjects() {
  return featuredProjectIds
    .map((id) => allProjects.find((p) => p.id === id))
    .filter(Boolean) as Project[];
}
