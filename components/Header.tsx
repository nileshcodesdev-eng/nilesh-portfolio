"use client";

import Link from "next/link";
import Socials from "@/components/Socials";

const Header = () => {
  return (
    <header className="absolute z-30 w-full items-center px-6 xl:px-16 xl:h-24">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-y-4 py-4 sm:py-6">
          <Link prefetch href="/" className="group flex items-center gap-3">
            {/* Liquid Glass Monogram Logo */}
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#f13024] via-[#7928ca] to-[#06b6d4] p-[1px] shadow-lg shadow-cyan-500/10 group-hover:shadow-cyan-400/30 group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full rounded-[15px] bg-[#0c0e1a]/90 backdrop-blur-md flex items-center justify-center font-extrabold text-sm text-white font-mono tracking-wider">
                NC
              </div>
            </div>

            <div className="flex flex-col text-left">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-1.5">
                nilesh<span className="font-light text-white/70">chaurasiya</span>
                <span className="relative flex h-2 w-2 ml-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                </span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/50 font-medium">
                Full Stack Developer &bull; ERP &amp; Cloud
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-x-4 sm:gap-x-6">
            <Link
              href="/contact"
              className="hidden md:flex items-center gap-x-2 text-[11px] font-mono uppercase tracking-wider py-1.5 px-4 rounded-full bg-white/[0.04] border border-white/15 hover:border-cyan-400/60 text-white/80 hover:text-white backdrop-blur-md transition-all duration-300 shadow-lg shadow-black/30"
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
