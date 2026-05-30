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
    description: "The second iteration of Cloak AI, a privacy-first, locally-hosted AI powerhouse designed for secure, sophisticated task automation. Cloak AI leverages Nemotron Nano 3 Omni as the default model via Ollama to provide advanced language processing without data ever leaving the local environment.",
    longDescription:
      "A privacy-first, locally-hosted AI powerhouse designed for secure, sophisticated task automation. Cloak AI leverages Nemotron Nano 3 Omni via Ollama to provide advanced language processing without data ever leaving the local environment. Built with a FastAPI backend and React frontend, it features dynamic model switching between four different models, real-time response streaming, persistent local history, and an expansive toolset—ranging from Yahoo Finance and GFS weather data to high-end multimodal capabilities like Whisper transcription and SAM3 satellite image segmentation. Experience the power of a modern AI agent with the security of a closed-loop system.",
    images: [
      { src: "/projectImages/Cloak2.0/Cloak_Welcome.png", caption: "Main welcome screen featuring the dynamic model selector with support for Nemotron Nano 3 Omni and other local models." },
      { src: "/projectImages/Cloak2.0/Chat_Interface.png", caption: "Full chat interface showing a detailed AI response with the Agent Activity button and Sources panel enabled." },
      { src: "/projectImages/Cloak2.0/Agent_Activity.png", caption: "Agent Activity sidebar expanded, displaying the step-by-step reasoning trace and tool calls in real time." },
      { src: "/projectImages/Cloak2.0/Inline_Agent_Activity.png", caption: "Inline agent reasoning steps shown directly inside a chat message during response generation." },
    ],
    category: "AI/ML",
    subCategory: ["Agentic", "RAG", "Multi-Modal"],
    technologies: [
      "Python",
      "Nemotron Nano 3 Omni",
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
      label: "In active development since",
      value: "May 2026",
    },
    story: {
      role: "Sole developer and system architect for the entire platform.",
      context: "I was happy with the first iteration of Cloak AI but I knew there was room for improvement. This version was a complete rewrite to integrate the new Omni model along with dynamic model switching to let the user choose which model they want to use, add more tools and upgrade current tool functionality, and significantly modernize the UI/UX.",
      challenges: "Integrating the new Omni model required significant backend modifications and ensuring seamless dynamic model switching without compromising performance.",
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
      "A privacy-first, locally-hosted AI powerhouse designed for secure, sophisticated task automation. Cloak AI leverages Nemotron Nano 3 via Ollama to provide advanced language processing without data ever leaving the local environment. Built with a FastAPI backend and React frontend, it features dynamic model switching between four different models, real-time response streaming, persistent local history, and an expansive toolset—ranging from Yahoo Finance and GFS weather data to high-end multimodal capabilities like Whisper transcription and SAM3 satellite image segmentation. Experience the power of a modern AI agent with the security of a closed-loop system.",
    images: [
      { src: "/projectImages/Cloak/ChatPage.png", caption: "Main chat landing page of the original Cloak AI with quick action cards and Deep Search mode toggle." },
      { src: "/projectImages/Cloak/ImgSegPage.png", caption: "Local image segmentation interface with upload area and prompt input for object detection." },
      { src: "/projectImages/Cloak/ActivateChat.png", caption: "Active chat session showing a detailed response with sources and deep research output." },
      { src: "/projectImages/Cloak/ImgSegSat.png", caption: "Satellite image segmentation mode with coordinate inputs (latitude, longitude, buffer size)." },
    ],
    category: "AI/ML",
    subCategory: ["Agentic", "RAG", "Multi-Modal"],
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
      "Multi-modal AI agent designed to emulate a Geek Squad Consultation Agent, capable of understanding text, images, audio, and video.",
    longDescription:
      "A powerful multi-modal AI agent built with Qwen 2.5-Omni that emulates a Geek Squad Consultation Agent. The agent can process and respond to text, images, audio, and video inputs, making it highly effective for customer support, device troubleshooting, and interactive assistance. It features automatic speech recognition via Whisper, audio response generation with speaker selection, and a custom system prompt designed to deliver clear, professional troubleshooting reports.",
    images: [
      { src: "/projectImages/AgentQwen/StartScreen.png", caption: "Starting screen of the multi-modal Agent Qwen Gradio interface for device troubleshooting." },
      { src: "/projectImages/AgentQwen/ActivateChat.png", caption: "Active multi-modal conversation with the Qwen 2.5-Omni agent processing user input." },
    ],
    category: "AI/ML",
    subCategory: ["Agentic", "Multi-Modal"],
    technologies: [
      "Python",
      "Qwen 2.5 Omni",
      "Gradio",
      "Multi-Modal",
      "Whisper",
      "FastRTC",
      "PyTorch",
      "Transformers",
    ],
    github: "https://github.com/JakeFurtaw/Agent-Qwen",
    live: "https://www.youtube.com/watch?v=dCSDCVwJvcA",
    dateInfo: {
      label: "Built from ",
      value: "2024 to 2025",
    },

    story: {
      role: "Sole developer — designed and built both the model pipeline and the Gradio interface.",
      context: "I wanted to explore what a truly multi-modal local agent could feel like in a real-world support scenario.",
      challenges: "This was my first time working with an Omni model. At the time documentation was limited, and coordinating audio, vision, and text in one agent while keeping latency acceptable and the system prompt effective was complex.",
      approach: "Used Qwen 2.5-Omni with custom tooling around Whisper and FastRTC, plus a carefully engineered system prompt for professional troubleshooting.",
      learnings: "Multi-modal agents are extremely powerful, but prompt engineering and tool orchestration matter even more than raw model capability.",
      impact: "Created one of the most impressive local demos I’ve built and gained deep intuition about multi-modal agent design.",
    },
  },
  {
    id: 2,
    title: "Chat RAG",
    description:
      "Advanced Retrieval-Augmented Generation (RAG) coding assistant with support for multiple LLMs, documents, and GitHub repositories.",
    longDescription:
      "Full-featured RAG pipeline built with Llama-Index and LangChain that supports chatting with documents (PDF, DOCX, etc.), GitHub repositories, and multiple vector stores (ChromaDB, Milvus, Neo4j). Features dynamic model selection across Ollama, OpenAI, Anthropic, NVIDIA NIM, and quantized Hugging Face models. Includes streaming responses, advanced memory management, custom system prompts, and GPU-aware model handling.",
    images: [
      { src: "/projectImages/Chat-RAG/start_state.png", caption: "Initial state of the advanced RAG chat interface before any queries." },
      { src: "/projectImages/Chat-RAG/model_dropdown.png", caption: "Model selection dropdown showing support for multiple LLM providers (Ollama, OpenAI, Anthropic, etc.)." },
      { src: "/projectImages/Chat-RAG/query.png", caption: "RAG query in progress with document retrieval and streaming response." },
      { src: "/projectImages/Chat-RAG/RAG_Query.png", caption: "Example of a successful RAG query with retrieved context and cited sources." },
    ],
    category: "AI/ML",
    subCategory: ["RAG"],
    technologies: [
      "Python",
      "RAG",
      "Llama-Index",
      "LangChain",
      "Gradio",
      "ChromaDB",
      "Milvus",
      "Neo4j",
      "Ollama",
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
      "AI-powered image generation and editing tool that lets users create and modify images using natural language prompts.",
    longDescription:
      "A Gradio web application for AI image generation and editing powered by Stable Diffusion. Supports text-to-image generation and image-to-image transformation using Flux models (FLUX.1-schnell and fine-tuned variants). Features customizable generation parameters, interactive image gallery, and responsive UI. Built with the Diffusers library and PyTorch for GPU-accelerated inference.",
    images: [
      { src: "/projectImages/ImageAlter/advanced_options.png", caption: "Advanced generation settings panel in the Stable Diffusion / Flux image editing Gradio app." },
      { src: "/projectImages/ImageAlter/gen_imgs.png", caption: "Text-to-image generation results using fine-tuned Flux models." },
      { src: "/projectImages/ImageAlter/i2i_ss.png", caption: "Image-to-image transformation example within the Image Alter application." },
      { src: "/projectImages/ImageAlter/img_alt_ss.png", caption: "Main interface of the AI-powered image editing tool with prompt input." },
      { src: "/projectImages/ImageAlter/out_img_gal.png", caption: "Output gallery showing multiple generated and edited images side by side." },
    ],
    category: "AI/ML",
    subCategory: ["Research"],
    technologies: [
      "Python",
      "Stable Diffusion",
      "Gradio",
      "Diffusers",
      "PyTorch",
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
      "Personalized AI health assistant that provides context-aware advice on fitness, nutrition, mental health, and general well-being.",
    longDescription:
      "An AI health assistant with user authentication and persistent per-user chat history. Built using Llama-Index for the retrieval-augmented chat engine, Hugging Face embeddings (stella_en_400M_v5), and Ollama (Mistral-Nemo) as the backend LLM. Features context-aware conversations, memory buffering, and a clean Gradio web interface for interactive health-related guidance on fitness, nutrition, mental health, and wellness.",
    images: [
      { src: "/projectImages/HealthG-Demo/ChatWindow.png", caption: "Main chat window of the personalized Health Bot RAG assistant." },
      { src: "/projectImages/HealthG-Demo/ChatbotWMemory.png", caption: "Health Bot conversation demonstrating memory and context retention across messages." },
      { src: "/projectImages/HealthG-Demo/WIthQuestionsAsked.png", caption: "Example interaction showing suggested health-related follow-up questions." },
    ],
    category: "AI/ML",
    subCategory: ["RAG"],
    technologies: [
      "Python",
      "Llama-Index",
      "Gradio",
      "Ollama",
      "Transformers",
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
      "Command-line tool that lets you chat with any GitHub repository using local Ollama LLMs.",
    longDescription:
      "A privacy-focused command-line tool that allows users to interact with entire GitHub repositories using local Ollama LLMs. Repo Ripper uses Llama-Index to index codebases and enables natural language queries about structure, dependencies, and functionality. Supports file filtering, conversation memory, and works entirely offline after initial setup.",
    category: "AI/ML",
    subCategory: ["RAG"],
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
