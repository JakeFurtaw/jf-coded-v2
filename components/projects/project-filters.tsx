"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { categories, subCategories, type Category, type SubCategory } from "@/lib/projects";
import { cn } from "@/lib/utils";

export type CategoryFilter = "All" | Category;
export type SubCategoryFilter = "All" | SubCategory;

/** Category pills, plus subcategory pills when AI/ML is selected. */
export function ProjectFilters({
  category,
  subCategory,
  onCategoryChange,
  onSubCategoryChange,
}: {
  category: CategoryFilter;
  subCategory: SubCategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  onSubCategoryChange: (subCategory: SubCategoryFilter) => void;
}) {
  return (
    <div className="mb-12 flex flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-3" role="group" aria-label="Filter by category">
        {(["All", ...categories] as const).map((c) => (
          <Button
            key={c}
            variant={category === c ? "default" : "outline"}
            aria-pressed={category === c}
            onClick={() => onCategoryChange(c)}
            className={cn(
              "rounded-full px-6 py-2 transition-all active:scale-95 touch-manipulation md:px-8",
              category !== c && "border-cyan-400/50 active:border-cyan-400 active:text-cyan-400",
            )}
          >
            {c}
          </Button>
        ))}
      </div>

      <AnimatePresence>
        {category === "AI/ML" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-wrap justify-center gap-2"
            role="group"
            aria-label="Filter AI/ML projects by type"
          >
            {(["All", ...subCategories] as const).map((s) => (
              <Button
                key={s}
                variant={subCategory === s ? "default" : "outline"}
                aria-pressed={subCategory === s}
                onClick={() => onSubCategoryChange(s)}
                className={cn(
                  "rounded-full px-4 py-1 text-xs transition-all active:scale-95 touch-manipulation",
                  subCategory !== s && "border-cyan-400/30 text-white/60 active:border-cyan-400 active:text-cyan-400",
                )}
              >
                {s}
              </Button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
