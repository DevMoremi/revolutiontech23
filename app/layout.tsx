import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Bricolage_Grotesque } from "next/font/google";
import { ToastProvider } from "@/components/Toast";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "RevolutionTech23 — Build a Career in the Oil & Gas Industry",
  description:
    "Industry-focused training and engineering consultancy turning knowledge into practical skills. We combine expert instruction with hands-on practice for real-world results.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${bricolage.variable}`}>
      <body className="bg-white font-sans text-brand-purple-deep antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
