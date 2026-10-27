"use client";

import { motion } from "framer-motion";

const Transition = () => {
  const transitionVariants = {
    initial: {
      x: "100%",
      width: "100%",
    },
    animate: {
      x: "0%",
      width: "0%",
    },
    exit: {
      x: ["0%", "100%"],
      width: ["0%", "100%"],
    },
  };

  // Active Theory signature smooth cubic bezier easing
  const smoothEase = [0.22, 1, 0.36, 1] as const;

  return (
    <>
      {/* Primary Liquid Wave Layer (Deep Oceanic Cyan) */}
      <motion.div
        role="status"
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-40 bg-[#06b6d4]/90 backdrop-blur-xl"
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.05, duration: 0.65, ease: smoothEase }}
        aria-hidden
      />

      {/* Secondary Liquid Wave Layer (Electric Violet / Magenta) */}
      <motion.div
        role="status"
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-30 bg-[#4f1f85]/95 backdrop-blur-lg"
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.2, duration: 0.65, ease: smoothEase }}
        aria-hidden
      />

      {/* Base Obsidian Glass Layer */}
      <motion.div
        role="status"
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-20 bg-[#0b0c16]"
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.35, duration: 0.65, ease: smoothEase }}
        aria-hidden
      />
    </>
  );
};

export default Transition;
