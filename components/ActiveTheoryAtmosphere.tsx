"use client";

import React, { useState } from "react";
import { HiSparkles } from "react-icons/hi2";
import { BsSoundwave } from "react-icons/bs";

export const ActiveTheoryAtmosphere: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none">
      {/* 1. Subtle Active Theory Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]"
        aria-hidden="true"
      />

      {/* 2. Ambient Water Caustic Glow Blobs */}
      <div className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-cyan-500/10 via-purple-600/10 to-transparent blur-[140px] animate-pulse duration-[8000ms]" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tl from-accent/15 via-rose-500/10 to-transparent blur-[140px] animate-pulse duration-[10000ms]" />

      {/* 3. Bottom Left Active Theory Cinematic HUD Status Bar */}
      <div className="hidden lg:flex fixed bottom-6 left-8 z-40 items-center gap-4 text-[10px] font-mono tracking-widest text-white/40 pointer-events-auto">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:border-cyan-400/50 transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-white/70">ACTIVE THEORY FLUID V3.2</span>
        </div>

        <button
          onClick={() => setIsMuted((m) => !m)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:border-accent text-white/60 hover:text-white transition-colors"
          title="Toggle Ambient Visual Frequency"
        >
          <BsSoundwave className="text-sm text-accent animate-pulse" />
          <span>{isMuted ? "FREQUENCY: OFF" : "48kHz LIQUID"}</span>
        </button>
      </div>

      {/* 4. Top Right Interactive Water Physics Badge */}
      <div className="hidden xl:flex fixed top-6 right-24 z-40 items-center gap-2 text-[10px] font-mono tracking-widest text-white/40">
        <div className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/60 flex items-center gap-1.5">
          <HiSparkles className="text-cyan-400 text-xs" />
          <span>REFRACTION: 1.48 IOR &bull; 60 FPS</span>
        </div>
      </div>
    </div>
  );
};

export default ActiveTheoryAtmosphere;
