"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsCodeSlash } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi2";

import Earth3D from "@/components/Earth3D";
import { fadeIn } from "@/variants";

const Home = () => {
  return (
    <div className="bg-[#070814] h-full overflow-y-auto xl:overflow-hidden relative flex items-center">
      {/* Subtle Atmospheric Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.12),rgba(255,255,255,0))]" />

      <div className="container mx-auto h-full flex flex-col justify-center pt-24 pb-16 xl:py-0 relative z-20">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-8 xl:gap-12">
          {/* Left Column: Clean, Spacious, Cinematic Copy */}
          <div className="w-full xl:w-[52%] flex flex-col text-center xl:text-left pt-6 xl:pt-0">
            {/* Engineering Status Pill */}
            <motion.div
              variants={fadeIn("down", 0.15)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 backdrop-blur-xl self-center xl:self-start mb-5 text-xs font-mono text-cyan-300 shadow-lg shadow-cyan-500/10"
            >
              <HiSparkles className="text-cyan-400 text-sm" />
              <span className="uppercase tracking-wider text-[11px]">
                Full Stack &bull; ERP &bull; Cloud Architect
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeIn("down", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="text-3xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1.12] mb-5 text-white"
            >
              Architecting Scalable <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                Enterprise Systems
              </span>{" "}
              &amp; Modern Web.
            </motion.h1>

            {/* Refined Professional Elevator Pitch (Written in polished natural language) */}
            <motion.p
              variants={fadeIn("down", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="max-w-xl mx-auto xl:mx-0 text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-8"
            >
              I bridge complex business logic with modern high-performance web interfaces. 
              Specializing in full-stack ERP architecture, RESTful API automation, and 
              enterprise-grade security across <span className="text-white font-medium">React, Angular, Node.js, and .NET (C#)</span> backed by robust SQL systems.
            </motion.p>

            {/* Clean Primary Actions */}
            <motion.div
              variants={fadeIn("down", 0.35)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex flex-wrap items-center justify-center xl:justify-start gap-4 mb-10"
            >
              <Link
                href="/work"
                className="btn px-7 rounded-full water-shimmer-btn text-white text-sm font-semibold tracking-wide flex items-center gap-2.5 hover:scale-105 transition-all duration-300 shadow-xl shadow-cyan-500/20"
              >
                <span>Explore Featured Systems</span>
                <BsArrowRight className="text-base" />
              </Link>

              <Link
                href="/about"
                className="btn px-6 rounded-full bg-white/[0.05] border border-white/20 hover:border-cyan-400 text-white text-sm font-medium tracking-wide flex items-center gap-2 backdrop-blur-md hover:bg-white/10 transition-all duration-300"
              >
                <BsCodeSlash className="text-cyan-400 text-base" />
                <span>Architecture &amp; Skills</span>
              </Link>
            </motion.div>

            {/* Minimalist Highlights Ticker */}
            <motion.div
              variants={fadeIn("up", 0.45)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex flex-wrap items-center justify-center xl:justify-start gap-6 pt-5 border-t border-white/10 text-xs font-mono text-slate-400"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="text-white font-bold">2+ Years</span> Production ERP
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-white font-bold">40%</span> Manual Sync Cut
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span className="text-white font-bold">90%</span> Auth Flags Cut
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Photorealistic Rotating Earth with Mouse Interaction */}
          <motion.div
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full xl:w-[48%] h-[360px] sm:h-[460px] xl:h-[540px] flex items-center justify-center relative pointer-events-auto"
          >
            <Earth3D />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
