"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const LiquidCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Viscous fluid lag with spring physics
  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Track hovered elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = Boolean(
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest(".btn") ||
        target.closest("[role='button']") ||
        target.closest(".swiper-button-next") ||
        target.closest(".swiper-button-prev")
      );

      setIsHovered(isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleElementHover, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleElementHover);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Liquid Ring with Inertial Lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-cyan-400/50 mix-blend-screen"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 56 : isClicking ? 28 : 36,
          height: isHovered ? 56 : isClicking ? 28 : 36,
          background: isHovered
            ? "radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(241, 48, 36, 0.15) 60%, rgba(0, 0, 0, 0) 100%)"
            : "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, rgba(0, 0, 0, 0) 70%)",
          backdropFilter: isHovered ? "blur(3px)" : "none",
          boxShadow: isHovered
            ? "0 0 20px rgba(6, 182, 212, 0.5), inset 0 0 10px rgba(241, 48, 36, 0.3)"
            : "0 0 10px rgba(6, 182, 212, 0.3)",
          transition: "width 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.2s ease, box-shadow 0.2s ease",
        }}
      />

      {/* Center Precise Liquid Spark */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-2 h-2 rounded-full bg-accent shadow-md shadow-accent"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isClicking ? 1.8 : isHovered ? 0.5 : 1,
          transition: "scale 0.15s ease",
        }}
      />
    </>
  );
};

export default LiquidCursor;
