"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { BsArrowDown, BsArrowRight, BsCodeSlash, BsSend, BsArrowUp } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi2";

import ActiveTheoryScroll3D from "@/components/ActiveTheoryScroll3D";
import ActiveTheoryScrollHUD from "@/components/ActiveTheoryScrollHUD";

const STAGES = [
  { id: 1, title: "TERRA ORBIT", tag: "01" },
  { id: 2, title: "SELECTED WORKS", tag: "02" },
  { id: 3, title: "SPATIAL ARCHITECTURE", tag: "03" },
  { id: 4, title: "QUANTUM VELOCITY", tag: "04" },
  { id: 5, title: "TRANSMISSION NEXUS", tag: "05" },
];

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentVelocity, setCurrentVelocity] = useState(0);
  const [currentStage, setCurrentStage] = useState(1);
  const prevProgressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Active Theory signature smooth spring momentum damping
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    restDelta: 0.0005,
  });

  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      const delta = latest - prevProgressRef.current;
      prevProgressRef.current = latest;
      setCurrentVelocity(delta * 90);
      setCurrentProgress(latest);

      // Determine active stage based on scroll depth
      if (latest < 0.2) {
        setCurrentStage(1);
      } else if (latest < 0.45) {
        setCurrentStage(2);
      } else if (latest < 0.7) {
        setCurrentStage(3);
      } else if (latest < 0.88) {
        setCurrentStage(4);
      } else {
        setCurrentStage(5);
      }
    });
  }, [smoothProgress]);

  const handleStageJump = (stageId: number) => {
    if (!containerRef.current) return;
    const scrollTarget =
      ((stageId - 1) / (STAGES.length - 1)) *
      (containerRef.current.scrollHeight - window.innerHeight);
    window.scrollTo({
      top: scrollTarget,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[500vh] bg-[#070814] text-white selection:bg-cyan-500/30 overflow-x-hidden"
    >
      {/* 1. Fullscreen Pinned Active Theory 3D WebGL Canvas */}
      <ActiveTheoryScroll3D
        scrollProgress={currentProgress}
        scrollVelocity={currentVelocity}
      />

      {/* 2. Pinned Active Theory Cybernetic Telemetry HUD */}
      <ActiveTheoryScrollHUD
        progress={currentProgress}
        velocity={currentVelocity}
        currentStage={currentStage}
        stages={STAGES}
        onStageClick={handleStageJump}
      />

      {/* 3. Sleek Floating Kinetic Typography (Unobstructed View of 3D Universe) */}

      {/* ================= STAGE 1: TERRA ORBIT (0% - 20%) ================= */}
      <div
        className={`fixed inset-0 z-20 flex items-end sm:items-center pb-24 sm:pb-0 pointer-events-none transition-all duration-700 ${
          currentStage === 1
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-8 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-12 flex flex-col xl:flex-row items-center justify-between">
          <div className="w-full xl:w-[50%] flex flex-col text-center xl:text-left pt-16 sm:pt-20 xl:pt-0 pointer-events-auto">
            {/* Engineering Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 backdrop-blur-xl self-center xl:self-start mb-4 sm:mb-6 text-[10px] sm:text-xs font-mono text-cyan-300 shadow-lg shadow-cyan-500/10">
              <HiSparkles className="text-cyan-400 text-xs sm:text-sm" />
              <span className="uppercase tracking-wider sm:tracking-widest text-[9px] sm:text-[10px]">
                FULL STACK &bull; ERP &bull; CLOUD ARCHITECT
              </span>
            </div>

            {/* Kinetic Typography Headline */}
            <h1 className="text-3xl sm:text-5xl xl:text-7xl font-black tracking-tight leading-[1.08] mb-3 sm:mb-6 text-white uppercase font-sans">
              NILESH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                CHAURASIYA
              </span>
            </h1>

            {/* Active Theory Manifesto Subtitle */}
            <p className="max-w-xl mx-auto xl:mx-0 text-xs sm:text-base text-slate-300 font-light leading-relaxed mb-5 sm:mb-8">
              Architecting enterprise ERP backbones, RESTful microservices, and modern
              interactive web experiences across <span className="text-white font-medium">React, Angular, Node.js, and .NET (C#)</span>.
            </p>

            {/* Minimalist Actions */}
            <div className="flex flex-wrap items-center justify-center xl:justify-start gap-2.5 sm:gap-4 mb-5 sm:mb-8">
              <button
                onClick={() => handleStageJump(2)}
                className="btn px-5 sm:px-7 py-2.5 sm:py-3 rounded-full water-shimmer-btn text-white text-[11px] sm:text-xs font-mono tracking-wider sm:tracking-widest uppercase flex items-center gap-2 hover:scale-105 transition-all duration-300 shadow-xl shadow-cyan-500/20"
              >
                <span>Scroll to Explore</span>
                <BsArrowDown className="text-xs sm:text-sm animate-bounce" />
              </button>

              <Link
                href="/about"
                className="btn px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/[0.05] border border-white/20 hover:border-cyan-400 text-white text-[11px] sm:text-xs font-mono tracking-wider sm:tracking-widest uppercase flex items-center gap-2 backdrop-blur-md hover:bg-white/10 transition-all duration-300"
              >
                <BsCodeSlash className="text-cyan-400 text-xs sm:text-sm" />
                <span>About &amp; Skills</span>
              </Link>
            </div>

            {/* Perimeter Micro Telemetry Ticker */}
            <div className="flex flex-wrap items-center justify-center xl:justify-start gap-3 sm:gap-6 pt-3 sm:pt-5 border-t border-white/10 text-[10px] sm:text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="text-white font-bold">2+ YRS</span> PROD ERP
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-white font-bold">40%</span> SYNC CUT
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span className="text-white font-bold">90%</span> AUTH SECURED
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= STAGE 2: SELECTED EXPERIENCES (20% - 45%) ================= */}
      <div
        className={`fixed inset-0 z-20 flex flex-col justify-between p-5 sm:p-14 pointer-events-none transition-all duration-700 ${
          currentStage === 2
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        <div className="pointer-events-auto max-w-lg pt-16 sm:pt-16">
          <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-300 mb-1.5 sm:mb-2 block">
            [ 02 // SELECTED EXPERIENCES ]
          </span>
          <h2 className="text-xl sm:text-4xl font-black text-white tracking-tight uppercase mb-2">
            HIGH-THROUGHPUT <span className="text-cyan-400">PLATFORMS.</span>
          </h2>
          <p className="text-xs text-slate-300 font-light mb-4 leading-relaxed max-w-md">
            Hover &amp; tap the floating 3D dimensional slabs in space to explore
            Common Data Environments, real-time analytics, and enterprise ERP architectures.
          </p>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full water-shimmer-btn text-white text-[10px] sm:text-[11px] font-mono uppercase tracking-wider sm:tracking-widest shadow-xl shadow-cyan-500/20 hover:scale-105 transition-all"
          >
            <span>Inspect All Works</span>
            <BsArrowRight />
          </Link>
        </div>

        <div className="self-end text-right text-[10px] font-mono text-cyan-400/60 uppercase tracking-widest pointer-events-none hidden sm:block pb-12 sm:pb-0">
          // SPATIAL GALLERY &bull; INTERACTIVE 3D RAYCASTING
        </div>
      </div>

      {/* ================= STAGE 3: SPATIAL ARCHITECTURE (45% - 70%) ================= */}
      <div
        className={`fixed inset-0 z-20 flex flex-col justify-between p-5 sm:p-14 pointer-events-none transition-all duration-700 ${
          currentStage === 3
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        <div className="pointer-events-auto max-w-lg pt-16 sm:pt-16">
          <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-300 mb-1.5 sm:mb-2 block">
            [ 03 // SPATIAL ARCHITECTURE ]
          </span>
          <h2 className="text-xl sm:text-4xl font-black text-white tracking-tight uppercase mb-2">
            DISTRIBUTED RESILIENCE &amp; <span className="text-cyan-400">ZERO-TRUST.</span>
          </h2>
          <p className="text-xs text-slate-300 font-light mb-4 leading-relaxed max-w-md">
            Interconnected microservice constellations — asynchronous REST backbones,
            role-based access control, and high-concurrency SQL schemas.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-white/[0.06] border border-cyan-400/40 hover:border-cyan-300 text-white text-[10px] sm:text-[11px] font-mono uppercase tracking-wider sm:tracking-widest hover:bg-cyan-500/10 transition-all"
            >
              <span>System Capabilities</span>
              <BsArrowRight />
            </Link>
          </div>
        </div>

        <div className="self-end text-right text-[10px] font-mono text-slate-400 uppercase tracking-widest pointer-events-none hidden sm:block pb-12 sm:pb-0">
          REACT.JS &bull; ANGULAR &bull; NODE.JS &bull; .NET CORE &bull; MYSQL
        </div>
      </div>

      {/* ================= STAGE 4: QUANTUM VELOCITY (70% - 88%) ================= */}
      <div
        className={`fixed inset-0 z-20 flex flex-col justify-between p-5 sm:p-14 pointer-events-none transition-all duration-700 ${
          currentStage === 4
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        <div className="pointer-events-auto max-w-lg pt-16 sm:pt-16">
          <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-300 mb-1.5 sm:mb-2 block">
            [ 04 // QUANTUM VELOCITY ]
          </span>
          <h2 className="text-xl sm:text-4xl font-black text-white tracking-tight uppercase mb-2 sm:mb-3">
            ENGINEERED FOR <span className="text-cyan-400">MEASURABLE IMPACT.</span>
          </h2>
          <p className="text-xs text-slate-300 font-light leading-relaxed mb-4 max-w-md">
            Hyperspeed execution through automated synchronization routines, granular auth
            hardening, and optimized database indexing.
          </p>
        </div>

        {/* Floating Minimalist Metric Badges (Lifted above mobile dock) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pointer-events-auto max-w-3xl mb-24 sm:mb-8">
          <div className="p-3 sm:p-3.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md text-center">
            <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">40%</div>
            <div className="text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-slate-400 mt-1">
              Manual Sync Cut
            </div>
          </div>
          <div className="p-3 sm:p-3.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md text-center">
            <div className="text-xl sm:text-2xl font-black text-purple-400 font-mono">90%</div>
            <div className="text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-slate-400 mt-1">
              Auth Flags Cut
            </div>
          </div>
          <div className="p-3 sm:p-3.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md text-center">
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">30%</div>
            <div className="text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-slate-400 mt-1">
              Query Speed Boost
            </div>
          </div>
          <div className="p-3 sm:p-3.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md text-center">
            <div className="text-xl sm:text-2xl font-black text-rose-400 font-mono">2+ YRS</div>
            <div className="text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-slate-400 mt-1">
              Production ERP
            </div>
          </div>
        </div>
      </div>

      {/* ================= STAGE 5: TRANSMISSION NEXUS (88% - 100%) ================= */}
      <div
        className={`fixed inset-0 z-20 flex items-center justify-center pointer-events-none transition-all duration-700 ${
          currentStage === 5
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        <div className="text-center pointer-events-auto max-w-lg px-4 sm:px-6 pb-24 sm:pb-0">
          <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-300 mb-2 inline-block">
            [ 05 // TRANSMISSION NEXUS ]
          </span>
          <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tight uppercase mb-3 sm:mb-4">
            READY TO <span className="text-cyan-400">ARCHITECT?</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
            Direct transmission portal for enterprise ERP architecture, high-performance
            web applications, and technical collaboration.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="btn w-full sm:w-auto px-7 py-3 rounded-full water-shimmer-btn text-white text-xs font-mono uppercase tracking-wider sm:tracking-widest font-semibold flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/30 hover:scale-105 transition-all"
            >
              <BsSend />
              <span>Initiate Transmission</span>
            </Link>
            <button
              onClick={() => handleStageJump(1)}
              className="btn w-full sm:w-auto px-6 py-3 rounded-full bg-white/[0.05] border border-white/20 hover:border-cyan-400 text-white text-xs font-mono uppercase tracking-wider sm:tracking-widest flex items-center justify-center gap-2 backdrop-blur-md transition-all"
            >
              <BsArrowUp />
              <span>Back to Orbit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
