import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE } from "@/lib/og-card";
import { AUTHOR, ROLE, SITE_TAGLINE } from "@/lib/site";

export const alt = `${AUTHOR} — ${ROLE}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow={ROLE}
        title={AUTHOR}
        subtitle={SITE_TAGLINE}
        tags={["Agentic AI", "RAG", "Multi-Agent Systems", "Azure AI Foundry"]}
      />
    ),
    size,
  );
}
