/**
 * Shared 1200×630 social preview card (rendered by next/og ImageResponse / Satori).
 * Satori rule: any element with more than one child needs display: "flex".
 */
export const OG_SIZE = { width: 1200, height: 630 };

/** Keeps the subtitle to ~2 lines at 32px; cuts at a word boundary. */
function clampText(text: string, max = 120): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:—-]+$/, "")}…`;
}

export function OgCard({
  eyebrow,
  title,
  subtitle,
  tags = [],
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  tags?: string[];
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        backgroundColor: "#0a0a0f",
        backgroundImage:
          "radial-gradient(circle at 15% 10%, rgba(34,211,238,0.22), transparent 45%), radial-gradient(circle at 90% 95%, rgba(168,85,247,0.22), transparent 45%)",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#22d3ee" }}>JFCoded</div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            color: "#22d3ee",
            border: "2px solid rgba(34,211,238,0.4)",
            borderRadius: 999,
            padding: "8px 22px",
          }}
        >
          {eyebrow.toUpperCase()}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 28 ? 72 : 92,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 32,
            lineHeight: 1.35,
            color: "rgba(255,255,255,0.75)",
            maxWidth: 1000,
          }}
        >
          {clampText(subtitle)}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 12 }}>
          {tags.slice(0, 4).map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                fontSize: 22,
                color: "#a5f3fc",
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 999,
                padding: "6px 18px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.55)" }}>jfcoded.com</div>
      </div>
    </div>
  );
}
