"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaReact, FaAngular, FaNodeJs, FaDatabase } from "react-icons/fa";
import { SiDotnet } from "react-icons/si";

const Avatar = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-full select-none">
      {/* Ambient background glow behind avatar */}
      <div className="absolute w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] bg-gradient-to-tr from-accent/25 via-purple-600/20 to-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* 3D Holographic Orbit Ring */}
      <div className="absolute w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] rounded-full border border-white/10 border-dashed animate-spin-slow pointer-events-none" />

      {/* Main Avatar Container with 3D Depth */}
      <div className="relative z-10 w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] xl:w-[480px] xl:h-[480px] rounded-full p-2 bg-gradient-to-b from-white/15 via-white/5 to-transparent backdrop-blur-sm border border-white/20 shadow-2xl shadow-accent/20 overflow-hidden">
        <div className="w-full h-full rounded-full overflow-hidden relative">
          <Image
            src="/nilesh-avatar.jpg"
            alt="Nilesh Jayprakash Chaurasiya"
            fill
            sizes="(max-width: 768px) 300px, (max-width: 1200px) 420px, 480px"
            className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
            priority
          />
          {/* Subtle bottom gradient to blend smoothly */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#131424] via-transparent to-transparent opacity-60" />
        </div>
      </div>

      {/* Floating 3D Tech Badges */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:flex absolute top-6 -left-6 z-20 items-center gap-2 bg-[#1b1c31]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 shadow-xl text-xs font-medium text-white/90"
      >
        <span className="p-1 rounded-lg bg-cyan-500/20 text-cyan-400">
          <FaReact className="text-base" />
        </span>
        <span>React &amp; Angular</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="hidden md:flex absolute top-12 -right-4 z-20 items-center gap-2 bg-[#1b1c31]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 shadow-xl text-xs font-medium text-white/90"
      >
        <span className="p-1 rounded-lg bg-purple-500/20 text-purple-400">
          <SiDotnet className="text-base" />
        </span>
        <span>.NET &amp; C# ERP</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="hidden md:flex absolute bottom-8 -left-4 z-20 items-center gap-2 bg-[#1b1c31]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 shadow-xl text-xs font-medium text-white/90"
      >
        <span className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400">
          <FaNodeJs className="text-base" />
        </span>
        <span>Node &amp; Express</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="hidden md:flex absolute bottom-12 -right-6 z-20 items-center gap-2 bg-[#1b1c31]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 shadow-xl text-xs font-medium text-white/90"
      >
        <span className="p-1 rounded-lg bg-amber-500/20 text-amber-400">
          <FaDatabase className="text-base" />
        </span>
        <span>SQL Server &amp; MySQL</span>
      </motion.div>
    </div>
  );
};

export default Avatar;
