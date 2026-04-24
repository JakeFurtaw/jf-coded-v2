"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoothing the cursor movement
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{
        background: `radial-gradient(600px circle at var(--x) var(--y), rgba(34, 211, 238, 0.15), transparent 80%)`,
      }}
    >
      {/* We use a dummy div to sync the CSS variables with Framer Motion values */}
      <motion.div 
        className="absolute inset-0"
        style={{
          x: smoothX,
          y: smoothY,
          // This is a trick to update CSS variables via a style object
        }}
      />
      <style jsx global>{`
        :root {
          --x: ${smoothX.get()}px;
          --y: ${smoothY.get()}px;
        }
      `}</style>
    </motion.div>
  );
}
