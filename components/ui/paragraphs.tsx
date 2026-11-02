import { cn } from "@/lib/utils";

/** Renders copy with blank-line ("\n\n") paragraph breaks as separate <p> elements. */
export function Paragraphs({ text, className }: { text: string; className?: string }) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className={cn("space-y-4", className)}>
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
