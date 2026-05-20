import Reveal from "./Reveal";

const STATS = [
  { value: "300+", label: "Students" },
  { value: "10+", label: "Trainers" },
  { value: "5+", label: "Programs" },
  { value: "3+", label: "Sectors" },
];

export default function Stats() {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
      <Reveal className="mx-auto max-w-5xl rounded-2xl bg-white px-6 py-8 shadow-card ring-1 ring-black/5 sm:py-10 lg:py-12">
        <ul className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-0">
          {STATS.map((s, i) => (
            <li
              key={s.label}
              className={`group flex flex-col items-center text-center transition sm:border-r sm:border-black/10 sm:px-4 ${
                i === STATS.length - 1 ? "sm:border-r-0" : ""
              }`}
            >
              <span className="text-4xl font-extrabold text-brand-purple-deep transition duration-300 group-hover:scale-110 group-hover:text-brand-cyan sm:text-3xl lg:text-4xl">
                {s.value}
              </span>
              <span className="mt-2 text-sm font-medium text-black/65 sm:text-base lg:text-lg">
                {s.label}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
