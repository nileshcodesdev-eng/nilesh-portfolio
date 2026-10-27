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
    <nav className="flex flex-col items-center xl:justify-center gap-y-4 fixed h-max bottom-0 mt-auto xl:right-[2%] z-50 top-0 w-full xl:w-16 xl:max-w-md xl:h-screen pointer-events-none">
      <div className="flex w-full xl:flex-col items-center justify-between xl:justify-center gap-y-8 px-6 md:px-36 xl:px-0 h-18 xl:h-max py-6 bg-black/50 backdrop-blur-2xl border-t xl:border border-white/15 text-2xl xl:text-lg xl:rounded-full shadow-2xl shadow-black/80 pointer-events-auto">
        {navData.map((link, i) => {
          const isActive = link.path === pathname;
          return (
            <Link
              prefetch
              className={`${
                isActive ? "text-cyan-400" : "text-white/60"
              } relative flex items-center justify-center group hover:text-cyan-300 transition-all duration-300 p-2.5 rounded-full`}
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

              {/* Active Theory Sleek HUD Tooltip */}
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

              <div className="relative z-10">
                <link.Icon aria-hidden className="transition-transform group-hover:scale-115" />
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
