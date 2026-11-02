import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE } from "@/lib/og-card";

export const alt = "Jacob Furtaw — Agentic AI Engineer";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Agentic AI Engineer"
        title="Jacob Furtaw"
        subtitle="I build privacy-first AI agents — transparent, local, and reliable enough to use every day."
        tags={["Agentic AI", "RAG", "Multi-Agent Systems", "Azure AI Foundry"]}
      />
    ),
    size,
  );
}
