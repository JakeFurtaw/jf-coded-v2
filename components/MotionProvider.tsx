'use client';

import { MotionConfig } from 'framer-motion';

/** Honors the OS "reduce motion" setting: transform animations are skipped, fades are kept. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
