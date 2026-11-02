"use client";

import { useCallback, useState } from "react";

/** Index state for an image carousel. next/prev wrap around in both directions. */
export function useImageCarousel(count: number) {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    if (count > 1) setIndex((i) => (i + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    if (count > 1) setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  return { index, setIndex, next, prev };
}
