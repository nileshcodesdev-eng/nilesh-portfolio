"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiChatBubbleBottomCenterText,
  HiEnvelope,
} from "react-icons/hi2";

export const navData: { name: string; path: string; Icon: IconType }[] = [
  { name: "home", path: "/", Icon: HiHome },
  { name: "about", path: "/about", Icon: HiUser },
  { name: "services", path: "/services", Icon: HiRectangleGroup },
  { name: "work", path: "/work", Icon: HiViewColumns },
  {
    name: "testimonials",
    path: "/testimonials",
    Icon: HiChatBubbleBottomCenterText,
  },
  {
    name: "contact",
    path: "/contact",
    Icon: HiEnvelope,
  },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-10 sm:bottom-6 left-1/2 -translate-x-1/2 xl:translate-x-0 xl:left-auto xl:right-[2%] xl:bottom-0 xl:top-0 z-50 w-[calc(100%-1.5rem)] max-w-sm sm:max-w-md xl:w-16 xl:h-screen flex items-center justify-center pointer-events-none">
      <div className="flex w-full xl:max-w-none xl:flex-col items-center justify-between sm:justify-center gap-x-1 sm:gap-x-4 xl:gap-y-7 px-3 sm:px-6 xl:px-0 py-2 sm:py-2.5 xl:py-6 bg-[#080a18]/90 backdrop-blur-2xl border border-white/20 rounded-2xl xl:rounded-full shadow-2xl shadow-black/95 pointer-events-auto">
        {navData.map((link, i) => {
          const isActive = link.path === pathname;
          return (
            <Link
              prefetch
              className={`${
                isActive ? "text-cyan-400" : "text-white/60"
              } relative flex flex-col items-center justify-center group hover:text-cyan-300 transition-all duration-300 p-2 sm:p-2.5 rounded-full`}
              href={link.path}
              key={i}
            >
              {/* Active liquid glow pill behind active icon */}
              {isActive && (
                <motion.div
                  layoutId="activeNavPill"
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/25 via-accent/20 to-purple-500/20 border border-cyan-400/50 shadow-lg shadow-cyan-500/30"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}

              {/* Active Theory Sleek HUD Tooltip (Desktop) */}
              <div
                role="tooltip"
                className="absolute pr-14 right-0 hidden xl:group-hover:flex"
              >
                <div className="bg-[#121424]/95 border border-white/20 backdrop-blur-xl relative flex items-center px-3 py-1.5 rounded-lg shadow-2xl text-white">
                  <div className="text-[11px] font-mono tracking-wider uppercase font-semibold text-white/90">
                    [ {link.name} ]
                  </div>

                  <div
                    className="border-solid border-l-[#121424] border-l-6 border-y-transparent border-y-[5px] border-r-0 absolute -right-1.5"
                    aria-hidden
                  />
                </div>
              </div>

              <div className="relative z-10 text-xl sm:text-2xl xl:text-lg">
                <link.Icon aria-hidden className="transition-transform group-hover:scale-110" />
              </div>

              {/* Subtle active indicator dot on mobile */}
              {isActive && (
                <span className="xl:hidden w-1 h-1 rounded-full bg-cyan-400 mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
