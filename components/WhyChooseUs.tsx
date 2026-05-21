import Image from "next/image";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

const PILLARS = [
  {
    title: "Field-Grade Expertise",
    body:
      "Engineers, technologists, and field operators with hands-on experience across Oil & Gas, Mining, and Technology.",
    icon: "/images/icon-expertise.png",
  },
  {
    title: "Multidisciplinary Capability",
    body:
      "One firm covering industrial services, technology, multimedia, consultancy, and training.",
    icon: "/images/icon-consulting.png",
  },
  {
    title: "Applied Technology",
    body:
      "AI, drones, embedded systems, and data science deployed on real industrial problems, not just in classrooms.",
    icon: "/images/icon-innovation.png",
  },
  {
    title: "Industry-Built Training",
    body:
      "Programs designed and delivered by professionals actively working in their fields.",
    icon: "/images/icon-training.png",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <Reveal className="flex flex-col items-center text-center">
          <SectionLabel>Why Choose Us</SectionLabel>
          <h2 className="mt-4 text-3xl font-extrabold text-brand-purple-deep sm:text-4xl">
            Built for Industry, Tested in the Field
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-black/65 sm:text-base">
            Real-world expertise, applied technology, and multidisciplinary
            capability across every sector we operate in.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-y-10 gap-x-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
          {PILLARS.map((p, idx) => (
            <Reveal key={p.title} delay={idx * 100} className="flex justify-center">
              <div className="decagon group relative flex aspect-square w-full max-w-[260px] flex-col items-center justify-center bg-brand-purple-deep px-7 py-8 text-center text-white transition duration-300 hover:-translate-y-1.5 hover:bg-brand-purple">
                <Image
                  src={p.icon}
                  alt="icon-image"
                  width={64}
                  height={64}
                  className="h-14 w-14 object-contain transition duration-500 group-hover:scale-110 sm:h-16 sm:w-16"
                />
                <h3 className="mt-3 text-base font-bold sm:text-lg">
                  {p.title}
                </h3>
                <p className="mt-2 text-[11px] leading-snug text-white/80 sm:text-xs">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
