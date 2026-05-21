import Logo from "./Logo";

type FooterLink = { label: string; href: string };

const SERVICES: FooterLink[] = [
  { label: "Oil & Gas", href: "#services" },
  { label: "Mining", href: "#services" },
  { label: "Engineering Consultancy", href: "#services" },
  { label: "Technology", href: "#services" },
  { label: "Multimedia", href: "#services" },
  { label: "Training", href: "#programs" },
];
const LINKS: FooterLink[] = [
  { label: "Who We Are", href: "#who" },
  { label: "What We Do", href: "#services" },
  { label: "Training Programs", href: "#programs" },
  { label: "FAQ", href: "#faq" },
];
const SOCIAL = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.54 0h4.37v1.93h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.48 3.04 5.48 7v7.44h-4.55v-6.6c0-1.58-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.49V22H7.76V8z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.5 3.5A11 11 0 003.6 17.7L2 22l4.4-1.5A11 11 0 1020.5 3.5zM12 20.2a8.2 8.2 0 01-4.2-1.1l-.3-.2-2.6.9.9-2.5-.2-.3A8.2 8.2 0 1112 20.2zm4.5-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.6.1-.7.8-.8 1-.3.1-.6 0a6.7 6.7 0 01-2-1.2 7.5 7.5 0 01-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.5a2 2 0 00.2-.4.4.4 0 000-.4l-.7-1.7c-.2-.4-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.8 11.8 11.8 0 004.5 4 5.4 5.4 0 002.5.5 2.7 2.7 0 001.8-1.3 2.2 2.2 0 00.2-1.3c-.1-.1-.3-.2-.5-.3z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-purple-deep text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo className="text-white" />
            <ul className="mt-5 space-y-2.5 text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="mt-0.5 h-4 w-4 flex-none text-white"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                <a
                  href="mailto:info.revolutiontech23@gmail.com"
                  className="break-all transition hover:text-brand-cyan"
                >
                  info.revolutiontech23@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="mt-0.5 h-4 w-4 flex-none text-white"
                >
                  <path d="M5 4h3l2 5-2.5 1.5a11 11 0 005 5L14 13l5 2v3a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" />
                </svg>
                <span>0707 568 7434, 0916 411 0714</span>
              </li>
            </ul>
          </div>

          <Column title="Services" items={SERVICES} />
          <Column title="Quick Links" items={LINKS} />

          <div>
            <h4 className="text-base font-bold">Connect</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="inline-flex items-center gap-2 transition hover:text-brand-cyan"
                  >
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                      {s.icon}
                    </span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/55">
          © 2026 RevolutionTech23. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function Column({
  title,
  items,
}: Readonly<{ title: string; items: FooterLink[] }>) {
  return (
    <div>
      <h4 className="text-base font-bold">{title}</h4>
      <ul className="mt-4 space-y-2 text-sm text-white/75">
        {items.map((i) => (
          <li key={i.label}>
            <a
              href={i.href}
              className="transition hover:text-brand-cyan"
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
