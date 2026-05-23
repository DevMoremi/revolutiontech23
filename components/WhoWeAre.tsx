import Image from "next/image";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

type Pillar = { title: string; body: string };

const BULLETS: Pillar[] = [
  {
    title: "Oil & Gas & Mining",
    body: "RevolutionTech23 is actively involved in the oil and gas industry, including exploration, extraction, and related services, as well as the mining sector, focusing on exploration, extraction, and mineral resource management.",
  },
  {
    title: "Technology & Innovation",
    body: "Delivering technology-driven solutions including software development, artificial intelligence, robotics, drone technology, and embedded systems.",
  },
  {
    title: "Engineering Consultancy",
    body: "Offering expert technical advisory, industrial consultancy, HES services, project support, and professional guidance across engineering disciplines.",
  },
  {
    title: "Training & Education",
    body: "Equipping individuals and organizations with practical skills through industry-relevant training, workshops, and professional development programs.",
  },
  {
    title: "Multimedia & Production",
    body: "Creating impactful multimedia content through videography, documentary production, photography, and digital media solutions.",
  },
  {
    title: "Research & Development",
    body: "Driving innovation through research, emerging technologies, and advanced problem-solving solutions for modern industries.",
  },
];

export default function WhoWeAre() {
  return (
    <section id="who" className="bg-brand-blue-tint">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-10 lg:py-24">
        <Reveal className="group overflow-hidden rounded-xl shadow-card">
          <Image
            src="/images/who-we-are.jpg"
            alt="RevolutionTech23 team at work"
            width={1200}
            height={900}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="flex flex-col items-center text-center">
            <SectionLabel>Who we are</SectionLabel>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-brand-purple-deep sm:text-4xl">
              A Multidisciplinary Industry Firm
            </h2>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-black/70 sm:text-base">
            RevolutionTech23 is a multidisciplinary company delivering solutions across Oil &amp; Gas, Mining Engineering, Technology, Consultancy, Multimedia, Research &amp; Development and Professional Training.
          </p>

          <ul className="mt-6 space-y-5">
            {BULLETS.map((b) => (
              <li key={b.title} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-sm bg-brand-cyan text-brand-purple-deep">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3.5 w-3.5">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-brand-purple-deep sm:text-base">{b.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-black/65">{b.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-brand-cyan px-6 py-3 text-sm font-semibold text-brand-purple-deep transition hover:scale-[1.03] hover:brightness-110 active:scale-95"
          >
            Get in Touch
          </a>
        </Reveal>
      </div>
    </section>
  );
}
