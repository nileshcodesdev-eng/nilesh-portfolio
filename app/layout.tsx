import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Header from "@/components/Header";
import Nav from "@/components/Nav";
import TopLeftImg from "@/components/TopLeftImg";

import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora-family",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Nilesh Chaurasiya | Full Stack Developer",
  description:
    "Nilesh Jayprakash Chaurasiya is a Full Stack Developer with 2+ years of experience building and scaling enterprise ERP systems, CRM integrations, and web platforms using React.js, Angular, Node.js, Express.js, and .NET.",
  keywords: [
    "Nilesh Chaurasiya",
    "Nilesh Jayprakash Chaurasiya",
    "Full Stack Developer",
    "React.js",
    "Angular",
    "Node.js",
    "Express.js",
    ".NET",
    "C#",
    "ASP.NET",
    "MySQL",
    "MS SQL Server",
    "ERP Developer",
    "Portfolio",
    "Nashik",
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
        className={`${sora.variable} font-sora page bg-site text-white bg-cover bg-no-repeat relative`}
      >
        <TopLeftImg />
        <Nav />
        <Header />
        {children}
        <aside>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#393a47",
                color: "#fff",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              },
            }}
          />
        </aside>
      </body>
    </html>
  );
}
