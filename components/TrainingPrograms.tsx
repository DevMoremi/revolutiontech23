import Image from "next/image";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

type Program = {
  category: string;
  title: string;
  body: string;
  img: string;
  tags: { label: string; icon: "pin" | "building" | "badge" }[];
};

const PROGRAMS: Program[] = [
  {
    category: "Tech Training",
    title: "Diploma in Data Science",
    body:
      "Gain practical skills in data analysis, machine learning, and visualization using real-world tools.",
    img: "/images/program-data.jpg",
    tags: [
      { label: "Lagos", icon: "pin" },
      { label: "Physical", icon: "building" },
      { label: "Certification", icon: "badge" },
    ],
  },
  {
    category: "Tech Training",
    title: "Certified Drone Pilot",
    body:
      "Learn drone operations, aerial mapping, and inspection for real-world industry applications.",
    img: "/images/program-drone.jpg",
    tags: [
      { label: "Lagos", icon: "pin" },
      { label: "Physical", icon: "building" },
      { label: "Certification", icon: "badge" },
    ],
  },
  {
    category: "Multimedia Training",
    title: "Live Streaming Training",
    body:
      "Master live production, video streaming, and digital content creation for events and media.",
    img: "/images/program-streaming.jpg",
    tags: [
      { label: "Lagos", icon: "pin" },
      { label: "Physical", icon: "building" },
      { label: "Certification", icon: "badge" },
    ],
  },
  {
    category: "Tech Training",
    title: "Embedded Systems Training",
    body:
      "Learn to design and program embedded systems using microcontrollers, sensors, and real-time applications.",
    img: "/images/program-embedded.jpg",
    tags: [
      { label: "Lagos", icon: "pin" },
      { label: "Physical", icon: "building" },
      { label: "Certification", icon: "badge" },
    ],
  },
];

function TagIcon({ icon }: Readonly<{ icon: Program["tags"][number]["icon"] }>) {
  const stroke = "currentColor";
  if (icon === "pin")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" className="h-3.5 w-3.5">
        <path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  if (icon === "building")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" className="h-3.5 w-3.5">
        <path d="M4 21V5a2 2 0 012-2h8a2 2 0 012 2v16M9 21v-4h4v4M9 9h.01M9 13h.01M13 9h.01M13 13h.01" />
        <path d="M16 21h4V11h-4" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" className="h-3.5 w-3.5">
      <path d="M12 15a4 4 0 100-8 4 4 0 000 8z" />
      <path d="M8.5 14L7 22l5-3 5 3-1.5-8" />
    </svg>
  );
}

export default function TrainingPrograms() {
  return (
    <section id="programs" className="bg-brand-orange">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <Reveal className="flex flex-col items-center text-center">
          <SectionLabel variant="orange">Training Programs</SectionLabel>
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Enroll in Industry-Ready Training
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-white/85 sm:text-base">
            Choose from our hands-on programs designed to equip you with
            practical skills for real-world opportunities.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {PROGRAMS.map((p, idx) => (
            <Reveal key={p.title} delay={idx * 120} as="article" className="h-full">
              <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-black/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
                <div className="relative aspect-[16/9] w-full flex-none overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <span className="inline-flex w-fit items-center rounded-md bg-brand-orange/15 px-3 py-1 text-xs font-semibold text-brand-orange">
                    {p.category}
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-brand-purple-deep">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/65">
                    {p.body}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li
                        key={t.label}
                        className="inline-flex items-center gap-1.5 rounded-md bg-brand-orange/10 px-2.5 py-1 text-xs font-medium text-brand-orange"
                      >
                        <TagIcon icon={t.icon} />
                        {t.label}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <a
                      href="#enroll"
                      className="inline-flex w-full items-center justify-center rounded-md bg-brand-cyan py-3 text-sm font-semibold text-brand-purple-deep transition hover:scale-[1.02] hover:brightness-110 active:scale-95"
                    >
                      Enroll Now
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
