import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

const PILLARS = [
  {
    title: "Industry Expertise",
    body:
      "Learn from professionals with real-world experience across engineering, oil & gas, mining, and technology sectors.",
    icon: "/images/icon-expertise.png",
  },
  {
    title: "Practical Training",
    body:
      "Our programs focus on real applications, ensuring participants gain skills they can immediately apply in their careers.",
    icon: "/images/icon-training.png",
  },
  {
    title: "Technology Innovation",
    body:
      "We incorporate emerging technologies such as AI, data science, and software development into our training programs.",
    icon: "/images/icon-innovation.png",
  },
  {
    title: "Consulting Support",
    body:
      "We provide consulting and advisory services that help organizations solve technical challenges and improve performance.",
    icon: "/images/icon-consulting.png",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <Reveal className="flex flex-col items-center text-center">
          <SectionLabel>Why Choose Us</SectionLabel>
          <h2 className="mt-4 text-3xl font-extrabold text-brand-purple-deep sm:text-4xl">
            We Turn Knowledge Into Real Industry Skills
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-black/65 sm:text-base">
            Our programs combine industry expertise, hands-on training, and
            modern technology to prepare professionals for real-world challenges.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-y-10 gap-x-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
          {PILLARS.map((p, idx) => (
            <Reveal key={p.title} delay={idx * 100} className="flex justify-center">
              <div className="decagon group relative flex aspect-square w-full max-w-[260px] flex-col items-center justify-center bg-brand-purple-deep px-7 py-8 text-center text-white transition duration-300 hover:-translate-y-1.5 hover:bg-brand-purple">
                <img
                  src={p.icon}
                  alt=""
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
