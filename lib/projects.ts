export interface Project {
  id: number;
  title: string;
  description: string; // Short description for cards
  longDescription: string;
  images?: string[];
  github?: string;
  live?: string;
  category: "AI/ML" | "Web";
  subCategory?: string[];
  technologies: string[];
}

// Full project data - single source of truth
export const allProjects: Project[] = [
  {
    id: 1,
    title: "Cloak AI",
    description: "A privacy-first, locally-hosted AI powerhouse designed for secure, sophisticated task automation. Cloak AI leverages Nemotron Nano 3 via Ollama to provide advanced language processing without data ever leaving the local environment.",
    longDescription:
      "A privacy-first, locally-hosted AI powerhouse designed for secure, sophisticated task automation. Cloak AI leverages Nemotron Nano 3 via Ollama to provide advanced language processing without data ever leaving the local environment. Built with a FastAPI backend and React frontend, it features real-time response streaming, persistent local history, and an expansive toolset—ranging from Yahoo Finance and GFS weather data to high-end multimodal capabilities like Whisper transcription and SAM3 satellite image segmentation. Experience the power of a modern AI agent with the security of a closed-loop system.",
    images: [
      "/projectImages/Cloak/ChatPage.png",
      "/projectImages/Cloak/ImgSegPage.png",
      "/projectImages/Cloak/ActivateChat.png",
      "/projectImages/Cloak/ImgSegSat.png",
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
  },
  {
    id: 2,
    title: "Agent Qwen",
    description:
      "Multi-modal AI agent designed to emulate a Geek Squad Consultation Agent, capable of understanding text, images, audio, and video.",
    longDescription:
      "A powerful multi-modal AI agent built with Qwen 2.5-Omni that emulates a Geek Squad Consultation Agent. The agent can process and respond to text, images, audio, and video inputs, making it highly effective for customer support, device troubleshooting, and interactive assistance. It features automatic speech recognition via Whisper, audio response generation with speaker selection, and a custom system prompt designed to deliver clear, professional troubleshooting reports.",
    images: [
      "/projectImages/AgentQwen/StartScreen.png",
      "/projectImages/AgentQwen/ActivateChat.png",
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
  },
  {
    id: 3,
    title: "Chat RAG",
    description:
      "Advanced Retrieval-Augmented Generation (RAG) coding assistant with support for multiple LLMs, documents, and GitHub repositories.",
    longDescription:
      "Full-featured RAG pipeline built with Llama-Index and LangChain that supports chatting with documents (PDF, DOCX, etc.), GitHub repositories, and multiple vector stores (ChromaDB, Milvus, Neo4j). Features dynamic model selection across Ollama, OpenAI, Anthropic, NVIDIA NIM, and quantized Hugging Face models. Includes streaming responses, advanced memory management, custom system prompts, and GPU-aware model handling.",
    images: [
      "/projectImages/Chat-RAG/start_state.png",
      "/projectImages/Chat-RAG/model_dropdown.png",
      "/projectImages/Chat-RAG/query.png",
      "/projectImages/Chat-RAG/RAG_Query.png",
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
  },
  {
    id: 4,
    title: "Auto Mutant Classifier",
    description:
      "An Abstract Syntax Tree Neural Network trained to detect equivalent mutants in Java and C++ code.",
    longDescription:
      "Built and trained an Abstract Syntax Tree Neural Network (ASTNN) to identify equivalent vs. non-equivalent mutants in Java and C++ source code. The model sorts an unlabeled dataset of equivalent and non-equivalent mutants into a labeled dataset automatically. This work aims to significantly reduce the manual effort required in mutation testing by automating equivalence detection.",
    images: [
      "/projectImages/AEMI/ASTNN_Flow_Chart.png",
      "/projectImages/AEMI/ASTNN_Flow_Chart_2.png",
      "/projectImages/AEMI/code2vec_pipeline.png",
      "/projectImages/AEMI/codeBERT_pipeline.png",
      "/projectImages/AEMI/modded_astnn_pipeline.png",
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
  },
  {
    id: 5,
    title: "Image Alter",
    description:
      "AI-powered image generation and editing tool that lets users create and modify images using natural language prompts.",
    longDescription:
      "A Gradio web application for AI image generation and editing powered by Stable Diffusion. Supports text-to-image generation and image-to-image transformation using Flux models (FLUX.1-schnell and fine-tuned variants). Features customizable generation parameters, interactive image gallery, and responsive UI. Built with the Diffusers library and PyTorch for GPU-accelerated inference.",
    images: [
      "/projectImages/ImageAlter/advanced_options.png",
      "/projectImages/ImageAlter/gen_imgs.png",
      "/projectImages/ImageAlter/i2i_ss.png",
      "/projectImages/ImageAlter/img_alt_ss.png",
      "/projectImages/ImageAlter/out_img_gal.png",
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
  },
  {
    id: 6,
    title: "Health Bot",
    description:
      "Personalized AI health assistant that provides context-aware advice on fitness, nutrition, mental health, and general well-being.",
    longDescription:
      "An AI health assistant with user authentication and persistent per-user chat history. Built using Llama-Index for the retrieval-augmented chat engine, Hugging Face embeddings (stella_en_400M_v5), and Ollama (Mistral-Nemo) as the backend LLM. Features context-aware conversations, memory buffering, and a clean Gradio web interface for interactive health-related guidance on fitness, nutrition, mental health, and wellness.",
    images: [
      "/projectImages/HealthG-Demo/ChatWindow.png",
      "/projectImages/HealthG-Demo/ChatbotWMemory.png",
      "/projectImages/HealthG-Demo/WIthQuestionsAsked.png",
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
  },
  {
    id: 7,
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
    id: 8,
    title: "Oceans",
    description:
      "React web app built as a semester long project for my Web Development course.",
    longDescription:
      "React web app built as a semester long project for my Web Development course at Towson University.",
    images: [
      "/projectImages/Oceans/Oceans-Landing-Page.png",
      "/projectImages/Oceans/Oceans-Homepage.png",
      "/projectImages/Oceans/Oceans-Profile-Page.png",
      "/projectImages/Oceans/Oceans-WebDev-Ocean-Page.png",
      "/projectImages/Oceans/Oceans-Create-Account-Page.png",
    ],
    category: "Web",
    technologies: ["Node.js", "React", "Express", "MongoDB"],
    github: "https://github.com/JakeFurtaw",
  },
  {
    id: 9,
    title: "Frontier Signal Partners Website",
    description: "Modern single page website for Frontier Signal Partners.",
    longDescription:
      "Built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and shadcn/ui.",
    images: ["/projectImages/FSPSite/FSPHomePage.png"],
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
