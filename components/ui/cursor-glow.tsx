"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/** Diameter of the glow in px. The gradient fades to transparent inside this box, so no edges show. */
const GLOW_SIZE = 480;

export default function CursorGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 140, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Center the glow on the cursor
  const glowX = useTransform(smoothX, (x) => x - GLOW_SIZE / 2);
  const glowY = useTransform(smoothY, (y) => y - GLOW_SIZE / 2);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-0"
      style={{
        x: glowX,
        y: glowY,
        width: GLOW_SIZE,
        height: GLOW_SIZE,
        // closest-side = the radius ends at the box edge, so the glow is fully transparent before it
        background:
          "radial-gradient(circle closest-side, rgba(34, 211, 238, 0.12), rgba(34, 211, 238, 0.05) 45%, transparent 100%)",
      }}
    />
  );
}
