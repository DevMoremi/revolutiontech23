"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Slide = {
  title: React.ReactNode;
  body: string;
  image: string;
};

const SLIDES: Slide[] = [
  {
    title: (
      <>
        Build a Career in <br />
        the Oil &amp; Gas <br />
        Industry
      </>
    ),
    body: "Gain practical knowledge in oil exploration, extraction processes, and mineral resource management through industry-focused training.",
    image: "/images/hero-1.jpg",
  },
  {
    title: (
      <>
        Master Technology &amp; <br />
        Digital Media Skills
      </>
    ),
    body: "Develop skills in software technology, digital media production, videography, and modern IT solutions.",
    image: "/images/hero-2.jpg",
  },
  {
    title: (
      <>
        Professional <br />
        Engineering Training <br />
        for the Real World
      </>
    ),
    body: "Learn from experienced professionals and gain practical engineering knowledge across multiple technical disciplines.",
    image: "/images/hero-3.jpg",
  },
];

const INTERVAL_MS = 6000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      id="home"
      className="relative isolate w-full overflow-hidden bg-brand-purple text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative min-h-[560px] sm:min-h-[640px] lg:min-h-[720px]">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${i === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
          >
            <Image
              src={slide.image}
              alt="hero-section-image"
              width={1920}
              height={1080}
              className="absolute inset-0 -z-10 h-full w-full object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-purple-dark/95 via-brand-purple/70 to-transparent" />

            <div className="mx-auto flex h-full min-h-[560px] max-w-7xl items-center px-5 pt-28 pb-16 sm:min-h-[640px] sm:px-8 lg:min-h-[720px] lg:px-10">
              <div
                key={`${i}-${index}`}
                className={`max-w-2xl ${i === index ? "animate-fade-up" : ""}`}
              >
                <h1 className="text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                  {slide.title}
                </h1>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg lg:text-xl">
                  {slide.body}
                </p>
                <a
                  href="#enroll"
                  className="mt-8 inline-flex items-center justify-center rounded-md bg-brand-cyan px-7 py-3.5 text-base font-semibold text-brand-purple-deep shadow-lg transition hover:brightness-110"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/25 sm:inline-flex"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        aria-label="Next slide"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/25 sm:inline-flex"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-brand-cyan" : "w-3 bg-white/40 hover:bg-white/60"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
