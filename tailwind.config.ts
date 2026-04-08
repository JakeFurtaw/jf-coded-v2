import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          bg: "#0a0a0f",      // Deep space black
          card: "#12121a",    // Slightly lighter panels
          accent: "#00f5ff",  // Cyan neon (AI/tech pop)
          purple: "#9d4edd",  // Nebula purple
          star: "#e0f2fe",    // Soft star white
        },
      },
      backgroundImage: {
        "nebula": "radial-gradient(circle at 30% 20%, rgba(157, 78, 221, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(0, 245, 255, 0.12) 0%, transparent 50%)",
        "starfield": "linear-gradient(to bottom, #0a0a0f, #1a1a2e)",
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;