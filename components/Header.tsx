import Link from "next/link";
import { HiDocumentText } from "react-icons/hi2";

import Socials from "@/components/Socials";

const Header = () => {
  return (
    <header className="absolute z-30 w-full items-center px-6 xl:px-16 xl:h-24">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-y-4 py-4 sm:py-6">
          <Link prefetch href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f13024] via-[#b61a49] to-[#4a22bd] flex items-center justify-center font-extrabold text-base text-white shadow-lg shadow-accent/25 group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 border border-white/20">
              NC
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-1.5">
                nilesh<span className="font-light text-white/70">chaurasiya</span>
                <span className="relative flex h-2.5 w-2.5 ml-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                </span>
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-medium">
                Full Stack Developer &bull; ERP &amp; Cloud
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-x-4 sm:gap-x-6">
            <Link
              href="/contact"
              className="hidden md:flex items-center gap-x-2 text-xs font-medium uppercase tracking-wider py-1.5 px-3.5 rounded-full bg-white/5 border border-white/10 hover:border-accent/60 text-white/80 hover:text-white transition-all duration-300"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Hire
            </Link>

            <Socials />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
