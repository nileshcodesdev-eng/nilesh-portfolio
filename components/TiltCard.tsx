"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltDegree?: number;
  glareEffect?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  tiltDegree = 10,
  glareEffect = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseCoord, setMouseCoord] = useState({ x: 50, y: 50 });

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(y, [0, 1], [tiltDegree, -tiltDegree]),
    { stiffness: 280, damping: 22 }
  );
  const rotateY = useSpring(
    useTransform(x, [0, 1], [-tiltDegree, tiltDegree]),
    { stiffness: 280, damping: 22 }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = (e.clientX - rect.left) / rect.width;
    const clientY = (e.clientY - rect.top) / rect.height;
    x.set(clientX);
    y.set(clientY);
    setMouseCoord({
      x: Math.round(clientX * 100),
      y: Math.round(clientY * 100),
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      className={`relative perspective-1000 transition-all duration-300 ${className}`}
    >
      <div style={{ transform: "translateZ(15px)" }} className="h-full w-full">
        {children}
      </div>

      {/* Active Theory Dynamic Liquid Glass Refraction Sheen */}
      {glareEffect && isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden"
          style={{
            transform: "translateZ(25px)",
            background: `radial-gradient(circle 240px at ${mouseCoord.x}% ${mouseCoord.y}%, rgba(6, 182, 212, 0.18), rgba(241, 48, 36, 0.1) 40%, transparent 75%)`,
            mixBlendMode: "screen",
          }}
        />
      )}
    </motion.div>
  );
};

export default TiltCard;
