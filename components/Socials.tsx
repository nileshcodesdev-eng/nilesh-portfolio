import Link from "next/link";
import type { IconType } from "react-icons";
import {
  RiLinkedinFill,
  RiGithubFill,
  RiMailFill,
  RiWhatsappFill,
  RiPhoneFill,
} from "react-icons/ri";

export const socialData: { name: string; link: string; Icon: IconType; color?: string }[] = [
  {
    name: "LinkedIn",
    link: "https://linkedin.com/in/nilesh-chaurasiya20",
    Icon: RiLinkedinFill,
  },
  {
    name: "GitHub",
    link: "https://github.com/nileshcodesdev-eng",
    Icon: RiGithubFill,
  },
  {
    name: "Email",
    link: "mailto:nilesh.codes.dev@gmail.com",
    Icon: RiMailFill,
  },
  {
    name: "WhatsApp",
    link: "https://wa.me/918766573044?text=Hi%20Nilesh,%20I%20reviewed%20your%20portfolio",
    Icon: RiWhatsappFill,
  },
  {
    name: "Phone",
    link: "tel:+918766573044",
    Icon: RiPhoneFill,
  },
];

const Socials = () => {
  return (
    <div className="flex items-center gap-x-1.5 sm:gap-x-3 text-lg">
      {socialData.map((social, i) => (
        <Link
          key={i}
          title={social.name}
          href={social.link}
          target="_blank"
          rel="noreferrer noopener"
          className="relative p-1.5 sm:p-2 rounded-full bg-white/5 border border-white/10 hover:border-accent hover:bg-accent/20 hover:text-accent transition-all duration-300 hover:scale-105 flex items-center justify-center text-white/80"
        >
          <social.Icon aria-hidden className="text-base sm:text-xl" />
          <span className="sr-only">{social.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Socials;
