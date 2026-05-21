import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <Reveal className="flex flex-col items-center text-center">
          <SectionLabel>Contact</SectionLabel>
          <h2 className="mt-4 text-3xl font-extrabold text-brand-purple-deep sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-black/65 sm:text-base">
            Reach our team for services, partnerships, consultancy, or general
            inquiries. For training enrollment, use the form above.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <Reveal delay={0}>
            <Card
              title="Email Us"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              }
            >
              <a
                href="mailto:info.revolutiontech23@gmail.com"
                className="break-all transition hover:text-brand-cyan"
              >
                info.revolutiontech23@gmail.com
              </a>
            </Card>
          </Reveal>

          <Reveal delay={100}>
            <Card
              title="Call Us"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                  <path d="M5 4h3l2 5-2.5 1.5a11 11 0 005 5L14 13l5 2v3a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" />
                </svg>
              }
            >
              <ul className="space-y-1">
                <li><a href="tel:+2347075687434" className="transition hover:text-brand-cyan">0707 568 7434</a></li>
                <li><a href="tel:+2349164110714" className="transition hover:text-brand-cyan">0916 411 0714</a></li>
              </ul>
            </Card>
          </Reveal>

          <Reveal delay={200}>
            <Card
              title="Visit Us"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                  <path d="M12 22s-7-7.5-7-13a7 7 0 0114 0c0 5.5-7 13-7 13z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              }
            >
              Lagos, Nigeria
            </Card>
          </Reveal>

          <Reveal delay={300}>
            <Card
              title="Open Hours"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              }
            >
              <div>Mon to Fri</div>
              <div>9:00 AM to 5:00 PM (WAT)</div>
            </Card>
          </Reveal>
        </div>

        <Reveal className="mt-10 flex justify-center">
          <a
            href="https://wa.me/2347075687434"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-cyan px-6 py-3 text-sm font-semibold text-brand-purple-deep transition hover:scale-105 hover:brightness-110 active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1a7.7 7.7 0 01-3.8-3.3c-.3-.4 0-.4.3-.7l.4-.5c.1-.2.1-.3 0-.5l-.9-2.2c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.8 11.8 11.8 0 004.5 4 5.4 5.4 0 002.5.5 2.7 2.7 0 001.8-1.3 2.2 2.2 0 00.2-1.3c-.1-.1-.3-.2-.5-.3zM12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.4A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .9.9-2.9-.2-.3A8.2 8.2 0 1112 20.2z" />
            </svg>
            Message us on WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Card({
  icon,
  title,
  children,
}: Readonly<{
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full flex-col items-center justify-start rounded-xl bg-white p-6 text-center shadow-card ring-1 ring-black/5 transition hover:shadow-lg">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-cyan/15 text-brand-cyan">
        {icon}
      </span>
      <h3 className="mt-4 text-base font-bold text-brand-purple-deep">{title}</h3>
      <div className="mt-2 text-sm text-black/65">{children}</div>
    </div>
  );
}
