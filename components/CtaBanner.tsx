export default function CtaBanner() {
  return (
    <section className="bg-white px-5 pb-16 sm:px-8 lg:px-10 lg:pb-24">
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-5 overflow-hidden rounded-xl bg-brand-purple-deep px-6 py-12 text-center text-white sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-1 mix-blend-screen"
          style={{
            backgroundImage: "url('/images/pattern.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "cover",
          }}
        />
        <h3 className="relative z-10 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
          Ready to Start Your Training Journey?
        </h3>
        <p className="relative z-10 max-w-xl text-sm text-white/80 sm:text-base">
          Take the next step toward building real industry skills.
        </p>
        <a
          href="#enroll"
          className="relative z-10 inline-flex items-center justify-center rounded-md bg-brand-cyan px-7 py-3 text-sm font-semibold text-brand-purple-deep transition hover:scale-105 hover:brightness-110 active:scale-95 sm:text-base"
        >
          Apply Now
        </a>
      </div>
    </section>
  );
}
