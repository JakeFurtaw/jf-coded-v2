"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function CursorGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 140, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Center the 700px glow on the cursor
  const glowX = useTransform(smoothX, (x) => x - 350);
  const glowY = useTransform(smoothY, (y) => y - 350);

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
      className="pointer-events-none fixed -inset-[350px] z-0"
      style={{
        x: glowX,
        y: glowY,
        background:
          "radial-gradient(700px circle at center, rgba(34, 211, 238, 0.12), transparent 75%)",
      }}
    />
  );
}
