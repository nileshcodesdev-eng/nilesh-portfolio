"use client";

import React, { useState, useRef, useEffect } from "react";
import { BsMouse, BsSoundwave } from "react-icons/bs";

interface ActiveTheoryScrollHUDProps {
  progress: number; // 0 to 1
  velocity?: number;
  currentStage: number; // 1 to 5
  stages: { id: number; title: string; tag: string }[];
  onStageClick?: (stageId: number) => void;
}

export const ActiveTheoryScrollHUD: React.FC<ActiveTheoryScrollHUDProps> = ({
  progress,
  velocity = 0,
  currentStage,
  stages,
  onStageClick,
}) => {
  const percent = Math.round(progress * 100);
  const altitude = Math.max(120, Math.round(42800 - progress * 42680));
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  // Web Audio Procedural Ambient Space Drone (Zero dependencies, pure browser synthesizer)
  const toggleAudio = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.06, ctx.currentTime);
        masterGain.connect(ctx.destination);

        // A-Minor Ethereal Ambient Chord Harmonics (110Hz, 164.8Hz, 220Hz, 329.6Hz)
        const chordFreqs = [110, 164.81, 220, 329.63];
        chordFreqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          const filter = ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(420, ctx.currentTime);

          osc.connect(filter);
          filter.connect(masterGain);
          osc.start();
        });

        audioCtxRef.current = ctx;
        masterGainRef.current = masterGain;
        setIsAudioPlaying(true);
      } else if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
        setIsAudioPlaying(true);
      } else if (audioCtxRef.current.state === "running") {
        audioCtxRef.current.suspend();
        setIsAudioPlaying(false);
      }
    } catch {
      // Audio autoplay policy fallback
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none font-mono text-[11px] tracking-widest text-slate-400">
      {/* --- Corner Precision Hairline Crosshairs (+) --- */}
      <div className="fixed top-5 left-6 text-cyan-400/40 text-xs font-light pointer-events-none">
        +
      </div>
      <div className="fixed top-5 right-6 text-cyan-400/40 text-xs font-light pointer-events-none">
        +
      </div>
      <div className="fixed bottom-5 left-6 text-cyan-400/40 text-xs font-light pointer-events-none">
        +
      </div>
      <div className="fixed bottom-5 right-6 text-cyan-400/40 text-xs font-light pointer-events-none">
        +
      </div>

      {/* --- Top Left Telemetry Tag --- */}
      <div className="hidden sm:flex fixed top-6 left-12 items-center gap-3 pointer-events-auto">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/80 font-bold uppercase text-[10px]">
            ACTIVE ENGINE V6
          </span>
          <span className="text-white/20">|</span>
          <span className="text-cyan-400 text-[10px]">60.0 FPS</span>
        </div>
      </div>

      {/* --- Top Right Spatial Coordinates --- */}
      <div className="hidden md:flex fixed top-6 right-12 items-center gap-3 pointer-events-auto">
        <div className="flex items-center gap-3 px-3.5 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[10px]">
          <span className="text-slate-400">COORD:</span>
          <span className="text-white font-medium">19.9975° N, 73.7898° E</span>
          <span className="text-white/20">|</span>
          <span className="text-slate-400">ALT:</span>
          <span className="text-cyan-400 font-bold">{altitude.toLocaleString()} KM</span>
        </div>
      </div>

      {/* --- Right Vertical Chapter Rail --- */}
      <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col items-end gap-5 pointer-events-auto">
        <div className="flex flex-col items-end gap-4 text-[10px] tracking-widest uppercase">
          {stages.map((stage) => {
            const isActive = stage.id === currentStage;
            return (
              <button
                key={stage.id}
                onClick={() => onStageClick?.(stage.id)}
                className={`flex items-center gap-3 transition-all duration-300 text-right group ${
                  isActive
                    ? "text-cyan-400 scale-105 font-bold"
                    : "text-white/40 hover:text-white"
                }`}
              >
                <span>
                  {stage.tag} // {stage.title}
                </span>
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-cyan-400 shadow-lg shadow-cyan-400 scale-125"
                      : "bg-white/20 group-hover:bg-white/60"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Dynamic Vertical Progress Scrubber */}
        <div className="relative w-[1px] h-32 bg-white/10 mt-2 mr-1">
          <div
            className="absolute top-0 right-0 w-full bg-gradient-to-b from-cyan-400 to-accent transition-all duration-150"
            style={{ height: `${percent}%` }}
          />
        </div>
      </div>

      {/* --- Mobile Top Right Telemetry Tag --- */}
      <div className="flex sm:hidden fixed top-18 right-3 items-center gap-2 px-2.5 py-1 rounded-full bg-black/75 border border-white/15 backdrop-blur-md text-[9px] pointer-events-auto shadow-lg z-30">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-cyan-300 font-bold">0{currentStage} / 05</span>
        <span className="text-white/20">|</span>
        <span className="text-white font-bold">{percent}%</span>
      </div>

      {/* --- Bottom Left Ambient Sound Synthesizer Toggle (Lifted above mobile dock) --- */}
      <div className="fixed bottom-26 left-3 sm:bottom-6 sm:left-8 pointer-events-auto z-30">
        <button
          onClick={toggleAudio}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-white/15 hover:border-cyan-400/50 backdrop-blur-md transition-all duration-300 group shadow-lg text-[9px] sm:text-[10px]"
          title="Toggle Active Theory Ambient Audio Synthesizer"
        >
          <BsSoundwave
            className={`text-sm transition-colors ${
              isAudioPlaying ? "text-cyan-400 animate-pulse" : "text-slate-500"
            }`}
          />
          <span className="uppercase text-slate-300 group-hover:text-white transition-colors">
            [{isAudioPlaying ? "LIVE" : "MUTE"}]
          </span>
          {isAudioPlaying && (
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-2 bg-cyan-400 animate-pulse" />
              <span className="w-0.5 h-3 bg-cyan-400 animate-bounce" />
              <span className="w-0.5 h-1.5 bg-cyan-400 animate-pulse" />
            </div>
          )}
        </button>
      </div>

      {/* --- Bottom Center Scroll Prompt (Lifted above mobile dock) --- */}
      <div
        className="fixed bottom-26 left-1/2 -translate-x-1/2 sm:bottom-6 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-500 uppercase z-20"
        style={{ opacity: Math.max(0, 1 - progress * 5.5) }}
      >
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 shadow-xl text-[9px] sm:text-[10px]">
          <BsMouse className="text-cyan-400 animate-bounce text-xs" />
          <span className="text-white/80">
            SCROLL TO TRAVERSE CONTINUUM
          </span>
        </div>
      </div>

      {/* --- Bottom Right Velocity & Progress Gauge --- */}
      <div className="hidden sm:flex fixed bottom-6 right-8 items-center gap-3 pointer-events-auto">
        <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[10px]">
          <span className="text-slate-400">VEL:</span>
          <span className="text-cyan-300 font-mono">
            {Math.abs(velocity).toFixed(1)} M/S
          </span>
          <span className="text-white/20">|</span>
          <span className="text-white font-bold">{percent}%</span>
        </div>
      </div>
    </div>
  );
};

export default ActiveTheoryScrollHUD;
