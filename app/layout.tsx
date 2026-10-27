import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Header from "@/components/Header";
import Nav from "@/components/Nav";
import TopLeftImg from "@/components/TopLeftImg";
import WaterDistortionCanvas from "@/components/WaterDistortionCanvas";
import LiquidCursor from "@/components/LiquidCursor";
import ActiveTheoryAtmosphere from "@/components/ActiveTheoryAtmosphere";

import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora-family",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Nilesh Chaurasiya | Full Stack Developer & 3D Interactive Systems",
  description:
    "Nilesh Jayprakash Chaurasiya is a Full Stack Developer with 2+ years of experience building enterprise ERP systems, CRM integrations, and immersive WebGL web platforms using React.js, Angular, Node.js, Express.js, and .NET.",
  keywords: [
    "Nilesh Chaurasiya",
    "Nilesh Jayprakash Chaurasiya",
    "Full Stack Developer",
    "Active Theory Style",
    "3D WebGL",
    "Three.js",
    "React.js",
    "Angular",
    "Node.js",
    "Express.js",
    ".NET",
    "C#",
    "MySQL",
    "MS SQL Server",
    "Portfolio",
  ],
  authors: [{ name: "Nilesh Jayprakash Chaurasiya" }],
  other: {
    "theme-color": "#f13024",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${sora.variable} font-sora page bg-site text-white bg-cover bg-no-repeat relative selection:bg-accent/40 selection:text-white`}
      >
        {/* Active Theory Global Liquid Water & Atmospheric FX */}
        <WaterDistortionCanvas />
        <LiquidCursor />
        <ActiveTheoryAtmosphere />

        <TopLeftImg />
        <Nav />
        <Header />
        {children}
        <aside>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "rgba(27, 28, 49, 0.9)",
                backdropFilter: "blur(12px)",
                color: "#fff",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              },
            }}
          />
        </aside>
      </body>
    </html>
  );
}
