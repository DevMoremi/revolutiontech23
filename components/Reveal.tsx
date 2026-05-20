"use client";

import { useEffect, useRef, useState } from "react";

type Props = Readonly<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}>;

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const Tag = as as any;

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={`transform-gpu transition-all duration-700 ease-out ${
        shown
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
