import Image from "next/image";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

const SERVICES = [
  {
    title: "Oil & Gas & Mining",
    body:
      "Exploration support, extraction operations, mineral resource management, and engineering consultancy across the energy and extractive sectors.",
    img: "/images/service-oil.jpg",
  },
  {
    title: "Engineering Consultancy & Training",
    body:
      "Technical advisory, HES services, project support, and industry-grade training, including our flagship Data Science, Drone, Live Streaming, and Embedded Systems programs.",
    img: "/images/service-engineering.jpg",
  },
  {
    title: "Technology & Multimedia",
    body:
      "Software, AI, robotics, drone technology, embedded systems, plus videography, documentary, and digital media production for industry.",
    img: "/images/service-tech.jpg",
  },
];

export default function CoreServices() {
  return (
    <section id="services" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <Reveal className="flex flex-col items-center text-center">
          <SectionLabel>What we do</SectionLabel>
          <h2 className="mt-4 text-3xl font-extrabold text-brand-purple-deep sm:text-4xl">
            Our Core Services
          </h2>
          <p className="mt-3 max-w-xl text-sm text-black/65 sm:text-base">
            We operate across the energy, technology, and creative sectors,
            delivering field services, consultancy, training, and digital
            production from one firm.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {SERVICES.map((s, idx) => (
            <Reveal key={s.title} delay={idx * 120} as="article">
              <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-black/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-1 flex-col bg-brand-purple-deep p-6 text-white">
                  <h3 className="text-lg font-bold sm:text-xl">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/75">
                    {s.body}
                  </p>
                  <a
                    href="#contact"
                    className="mt-5 inline-flex w-fit items-center justify-center rounded-md bg-brand-cyan px-5 py-2.5 text-xs font-semibold text-brand-purple-deep transition hover:scale-[1.04] hover:brightness-110 active:scale-95"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
