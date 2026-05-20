"use client";

import { useState } from "react";
import SectionLabel from "./SectionLabel";

const ITEMS = [
  {
    q: "What training programs does RevolutionTech23 offer?",
    a: "Diploma in Data Science, Certified Drone Pilot, Live Streaming Training & Embedded System Training.",
  },
  {
    q: "Who can enroll in these training programs?",
    a: "Anyone interested in gaining practical and professional skills can enroll.",
  },
  {
    q: "Do participants receive certification?",
    a: "Yes, participants receive certification upon successful completion of the training.",
  },
  {
    q: "How can I enroll?",
    a: "Fill out the enrollment form on the page and our team will contact you with the next steps.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="flex flex-col items-center text-center">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-4 text-3xl font-extrabold text-brand-purple-deep sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-black/65 sm:text-base">
            Find answers to common questions about our training programs and
            consulting services.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <h3 className="text-2xl font-extrabold leading-tight text-brand-purple-deep sm:text-3xl">
              Got Questions?
              <br />
              We&apos;ve Got Answers!
            </h3>
          </div>

          <ul className="space-y-3 lg:col-span-8">
            {ITEMS.map((item, idx) => {
              const isOpen = open === idx;
              return (
                <li
                  key={item.q}
                  className="overflow-hidden rounded-lg ring-1 ring-black/10 transition hover:ring-brand-cyan/40"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 bg-white px-5 py-4 text-left text-sm font-medium text-brand-purple-deep transition hover:bg-black/[0.02] sm:text-base"
                  >
                    <span>{item.q}</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`h-4 w-4 flex-none transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-black/10 bg-white px-5 py-4 text-sm text-black/70">
                        {item.a}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
