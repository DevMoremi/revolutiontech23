import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

const SERVICES = [
  {
    title: "Oil & Gas & Mining",
    body:
      "Practical training and consulting programs covering exploration, production, safety practices, and mineral resource management in the energy and extractive industries.",
    img: "/images/service-oil.jpg",
  },
  {
    title: "Engineering Consulting & Training",
    body:
      "Professional engineering consulting and technical training designed to help organizations solve complex challenges and build industry-ready expertise.",
    img: "/images/service-engineering.jpg",
  },
  {
    title: "Technology & Multimedia",
    body:
      "Programs focused on software development, IT solutions, multimedia production, and emerging technologies such as AI, data science, and robotics.",
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
            We operate across key industries, delivering professional solutions
            in energy, engineering, technology, and multimedia.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {SERVICES.map((s, idx) => (
            <Reveal key={s.title} delay={idx * 120} as="article">
              <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-black/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-1 flex-col bg-brand-purple-deep p-6 text-white">
                  <h3 className="text-lg font-bold sm:text-xl">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/75">
                    {s.body}
                  </p>
                  <a
                    href="#programs"
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
