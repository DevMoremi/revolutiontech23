"use client";

import { useState } from "react";
import Logo from "./Logo";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Who we are", href: "#who" },
  { label: "What we do", href: "#services" },
  { label: "Training Programs", href: "#programs" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40 bg-brand-purple text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <Logo className="text-white" />

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative text-sm font-medium text-white/90 transition hover:text-brand-cyan"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-brand-cyan transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#enroll"
            className="hidden rounded-md bg-brand-cyan px-5 py-2.5 text-sm font-semibold text-brand-purple-deep transition hover:scale-[1.04] hover:brightness-110 active:scale-95 lg:inline-flex"
          >
            Apply Now
          </a>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-brand-purple-dark px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-brand-cyan"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#enroll"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-brand-cyan px-4 py-2.5 text-center text-sm font-semibold text-brand-purple-deep"
            >
              Apply Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
