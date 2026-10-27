"use client";

import Link from "next/link";
import Socials from "@/components/Socials";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-40 w-full bg-[#080a18]/75 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-8 py-3.5 sm:py-4">
        <div className="flex flex-row justify-between items-center gap-x-4">
          {/* Logo & Name - High Contrast & Razor Sharp */}
          <Link prefetch href="/" className="group flex items-center gap-3.5">
            {/* Glowing Monogram Icon */}
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#f13024] via-[#7928ca] to-[#00f0ff] p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 group-hover:scale-105 transition-all duration-300 shrink-0">
              <div className="w-full h-full rounded-[14px] bg-[#0c0e20] flex items-center justify-center font-extrabold text-sm text-white font-mono tracking-wider">
                NC
              </div>
            </div>

            {/* Clearly Visible Name & Title */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-2xl font-black tracking-tight text-white drop-shadow-sm">
                  Nilesh{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-400 font-extrabold">
                    Chaurasiya
                  </span>
                </span>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-cyan-200/70 font-medium">
                Full Stack Developer &bull; ERP &amp; Cloud
              </span>
            </div>
          </Link>

          {/* Right Action Items */}
          <div className="flex items-center gap-x-3 sm:gap-x-6">
            <Link
              href="/contact"
              className="hidden sm:flex items-center gap-x-2 text-[11px] font-mono uppercase tracking-wider py-1.5 px-4 rounded-full bg-white/[0.06] border border-cyan-400/30 hover:border-cyan-400 text-white backdrop-blur-md transition-all duration-300 shadow-md shadow-black/40 hover:bg-cyan-500/10"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Hire</span>
            </Link>

            <Socials />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
