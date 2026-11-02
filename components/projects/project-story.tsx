import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export const storyBlocks: Array<{ key: keyof NonNullable<Project["story"]>; label: string }> = [
  { key: "role", label: "My Role" },
  { key: "context", label: "Context & Problem" },
  { key: "challenges", label: "Challenges" },
  { key: "approach", label: "Approach & Decisions" },
  { key: "learnings", label: "Key Learnings" },
  { key: "impact", label: "Impact & Results" },
];

/**
 * The project's story blocks (role, context, challenges, ...).
 * "page": label column + text column (case study). "compact": stacked (project modal).
 */
export function ProjectStory({
  story,
  variant = "page",
  className,
}: {
  story: NonNullable<Project["story"]>;
  variant?: "page" | "compact";
  className?: string;
}) {
  const blocks = storyBlocks.filter(({ key }) => story[key]);
  if (blocks.length === 0) return null;

  return (
    <div className={cn(variant === "page" ? "space-y-10" : "space-y-6 md:space-y-8", className)}>
      {blocks.map(({ key, label }) =>
        variant === "page" ? (
          <div key={key} className="grid grid-cols-1 gap-1.5 md:grid-cols-12 md:gap-6">
            <h3 className="pt-1 text-sm font-semibold uppercase tracking-[1.5px] text-white/40 md:col-span-4">
              {label}
            </h3>
            <p className="text-base leading-relaxed text-white/75 md:col-span-8 md:text-lg">{story[key]}</p>
          </div>
        ) : (
          <div key={key}>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-[1.5px] text-white/50 md:text-base">{label}</h3>
            <p className="text-[15px] leading-relaxed text-white/80 md:text-base">{story[key]}</p>
          </div>
        ),
      )}
    </div>
  );
}
