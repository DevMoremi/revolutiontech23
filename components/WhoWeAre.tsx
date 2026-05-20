import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import Image from "next/image";

const BULLETS = [
  "Oil & Gas & Mining Training",
  "Engineering Consulting & Professional Development",
  "Software Development & IT Solutions",
  "Multimedia & Digital Content Production",
];

export default function WhoWeAre() {
  return (
    <section id="who" className="bg-brand-blue-tint">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-10 lg:py-24">
        <Reveal className="group overflow-hidden rounded-xl shadow-card">
          <Image
            src="/images/who-we-are.jpg"
            alt="Team training session"
            width={1920}
            height={1080}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </Reveal>

        <Reveal delay={120}>
          <SectionLabel>Who we are</SectionLabel>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-brand-purple-deep sm:text-4xl">
            Empowering Industries Through Engineering, Technology, and
            Innovation
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-black/70 sm:text-base">
            Revolution Tech delivers industry-focused training and engineering
            consultancy that turns knowledge into practical skills. We combine
            expert instruction with hands-on practice for real-world results.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-black/70 sm:text-base">
            Our work covers oil &amp; gas, engineering consulting, IT solutions
            and multimedia production, all designed to help professionals and
            businesses grow and innovate.
          </p>

          <ul className="mt-6 space-y-3">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-sm bg-brand-cyan text-brand-purple-deep">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3.5 w-3.5">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                <span className="text-black/80">{b}</span>
              </li>
            ))}
          </ul>

          <a
            href="#programs"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-brand-cyan px-6 py-3 text-sm font-semibold text-brand-purple-deep transition hover:scale-[1.03] hover:brightness-110 active:scale-95"
          >
            Explore Programs
          </a>
        </Reveal>
      </div>
    </section>
  );
}
