/** Resume content for /resume. The downloadable PDF is maintained separately (see RESUME_PATH in lib/site.ts). */

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  period: string;
  details?: string;
}

export const experiences: Experience[] = [
  {
    title: "Agentic Engineer",
    company: "Integral Federal",
    location: "McLean, VA",
    period: "Sept 2026 – Present",
    description:
      "Engineering production agentic AI systems for federal clients, including an automated deep research agent that combines multi-source web scraping, LLM relevance validation, deterministic verification guards, and structured data extraction. Architecting the supporting Azure infrastructure: containerized services, Azure DevOps CI/CD pipelines, Azure Container Apps, and Azure AI Foundry model deployments.",
    technologies: [
      "Python",
      "Agentic AI",
      "Azure AI Foundry",
      "Azure Container Apps",
      "Azure DevOps",
      "Docker",
      "FastAPI",
      "Ollama",
      "vLLM",
      "React + TypeScript",
    ],
  },
  {
    title: "Gen AI Engineer",
    company: "Stealth AI Startup",
    location: "Baltimore, MD",
    period: "Jan 2026 – Sept 2026",
    description:
      "Building advanced generative AI solutions and intelligent systems for family and multi-family offices around the globe.",
    technologies: ["Python", "LLMs", "Generative AI"],
  },
  {
    title: "Co-Founder & Machine Learning Engineer",
    company: "SurgePoint Software LLC",
    location: "Towson, MD",
    period: "Aug 2023 – Jan 2025",
    description:
      "Co-founded SurgePoint and led the development of an AI-powered student information assistant using Llama 3.1 and Mistral models. Built a custom RAG pipeline and curated a 13M-line dataset from 200M+ raw web-scraped data and documents. Implemented advanced prompt engineering to serve accurate information to over 15,000 students. Won $1,000 in the Towson StartUp Pitch Competition and earned a spot in the Towson StartUp summer accelerator program.",
    technologies: ["Python", "RAG", "Llama 3.1", "Mistral", "Prompt Engineering", "LLMs", "Data Engineering"],
  },
  {
    title: "Advanced Repair Agent",
    company: "Geek Squad / Best Buy",
    location: "Towson & Owings Mills, MD",
    period: "Mar 2022 – Apr 2026",
    description:
      "Provided advanced technical support and repairs for computers, laptops, smartphones, and other consumer electronics. Specialized in complex diagnostics, data recovery, malware removal, and OS troubleshooting across Windows and macOS platforms. Handled escalated repairs with a focus on first-time fix rates and excellent customer service. Consistently the top performing ARA in the micromarket averaging 1.2+ tags per hour and 150%+ utilization.",
    technologies: [
      "Hardware Repair",
      "Software Troubleshooting",
      "Data Recovery",
      "Malware Removal",
      "Windows",
      "macOS",
      "Technical Diagnostics",
    ],
  },
];

export const education: Education[] = [
  {
    degree: "Bachelor of Science in Computer Science",
    school: "Towson University",
    location: "Towson, MD",
    period: "Jan 2022 – Dec 2023",
    details:
      "Software Engineering Track | Relevant coursework: Artificial Intelligence, Data Structures & Algorithms, Software Engineering, Database Management, Object-Oriented Design, Web Programming, Linear Algebra, Statistics",
  },
  {
    degree: "Associate of Arts in Computer Science",
    school: "Howard Community College",
    location: "Columbia, MD",
    period: "Aug 2019 – Dec 2021",
    details:
      "Relevant coursework: Computer Science I & II (C++), Discrete Mathematics, Intro to Python, Calculus I & II",
  },
];

export const skills: Record<string, string[]> = {
  "Programming Languages": ["Python", "JavaScript / TypeScript", "SQL", "C++"],
  "Frameworks & ML Libraries": [
    "PyTorch",
    "TensorFlow",
    "Transformers",
    "Diffusers",
    "LangChain",
    "Llama-Index",
    "Llama Parse",
    "FastAPI",
    "NumPy",
    "Pandas",
    "Scikit-learn",
    "Matplotlib",
    "PIL",
  ],
  "Inference & Optimization": [
    "vLLM",
    "Ollama",
    "Llama.cpp",
    "API Inference (SpaceXAI, OpenAI, Anthropic, NVIDIA NIMS)",
    "Quantization",
    "Model Training & Fine-tuning",
  ],
  "Agents & RAG Systems": [
    "Multi-Agent Architectures",
    "Retrieval-Augmented Generation (RAG)",
    "Agent Tool/Skill Development & Integration",
    "Vector Databases (ChromaDB, Milvus, Pinecone)",
    "OpenClaw",
    "Pi Coding Agent",
    "Hermes Agent",
  ],
  "Web & Frontend Development": ["React", "Next.js", "Node.js & Express", "Tailwind CSS", "Framer Motion"],
  "DevOps, Tools & Data": [
    "Docker",
    "Git",
    "Web Scraping (Playwright, Trafilatura)",
    "Google Earth Engine",
    "pytest",
    "Jupyter Notebooks",
  ],
};
