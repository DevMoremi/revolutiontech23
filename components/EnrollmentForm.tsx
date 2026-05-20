"use client";

import { useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import { useToast } from "./Toast";
import { clientEnrollmentSchema } from "@/lib/validation";

const PROGRAMS: { value: string; label: string }[] = [
  { value: "diploma-in-data-science",   label: "Diploma in Data Science" },
  { value: "certified-drone-pilot",     label: "Certified Drone Pilot" },
  { value: "live-streaming-training",   label: "Live Streaming Training" },
  { value: "embedded-systems-training", label: "Embedded Systems Training" },
];

const SOURCES: { value: string; label: string }[] = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook",  label: "Facebook" },
  { value: "whatsapp",  label: "WhatsApp" },
  { value: "website",   label: "Website" },
  { value: "other",     label: "Other" },
];

type State = "idle" | "submitting";

export default function EnrollmentForm() {
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const toast = useToast();

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

  function clearFieldError(name: string) {
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state !== "idle") return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const raw: Record<string, string> = {};
    fd.forEach((v, k) => {
      if (typeof v === "string") raw[k] = v;
    });

    // Drop empty optional fields so Zod's .optional() works as expected.
    if (raw.source === "") delete raw.source;

    // Client-side validation against the shared schema.
    const parsed = clientEnrollmentSchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]?.toString() ?? "_";
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      const firstMsg = Object.values(fieldErrors)[0];
      if (firstMsg) toast.error(firstMsg);
      return;
    }

    const token = turnstileRef.current?.getResponse();
    if (!token) {
      toast.error("Please complete the verification before submitting.");
      return;
    }

    setErrors({});
    setState("submitting");

    const body = { ...parsed.data, hp: raw.hp ?? "", turnstile_token: token };

    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json: unknown = await res.json().catch(() => ({}));
      const j = (json ?? {}) as {
        ok?: boolean;
        error?: string;
        errors?: Record<string, string>;
      };

      if (res.ok && j.ok) {
        toast.success("Application received — we'll contact you soon.");
        form.reset();
        turnstileRef.current?.reset();
      } else if (j.errors) {
        setErrors(j.errors);
        const first = Object.values(j.errors)[0];
        toast.error(first ?? "Please check the form and try again.");
      } else if (j.error) {
        toast.error(j.error);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setState("idle");
    }
  }

  return (
    <section id="enroll" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <Reveal className="flex flex-col items-center text-center">
          <SectionLabel>Enrollment</SectionLabel>
          <h2 className="mt-4 text-3xl font-extrabold text-brand-purple-deep sm:text-4xl">
            Start Your Training Journey Today
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-black/65 sm:text-base">
            Fill out the form below to apply for any of our professional training
            programs. Our team will contact you with the next steps.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 overflow-hidden rounded-xl shadow-card ring-1 ring-black/5 lg:grid-cols-2 lg:gap-0">
          <div className="order-2 bg-brand-purple-deep p-6 text-white sm:p-8 lg:order-1 lg:p-10">
            <h3 className="text-2xl font-extrabold sm:text-3xl">
              Start Your Training
              <br />
              Journey Today
            </h3>

            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-2 gap-4" noValidate>
              {/* Honeypot — invisible to humans */}
              <input
                type="text"
                name="hp"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[10000px] h-0 w-0 opacity-0"
              />

              <Input
                name="first_name"
                placeholder="First name"
                error={errors.first_name}
                onClear={() => clearFieldError("first_name")}
              />
              <Input
                name="last_name"
                placeholder="Last name"
                error={errors.last_name}
                onClear={() => clearFieldError("last_name")}
              />
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                wrapperClass="col-span-2 sm:col-span-1"
                error={errors.email}
                onClear={() => clearFieldError("email")}
              />
              <Input
                name="phone"
                type="tel"
                placeholder="Phone number (e.g. 08012345678)"
                wrapperClass="col-span-2 sm:col-span-1"
                error={errors.phone}
                onClear={() => clearFieldError("phone")}
              />
              <Select
                name="program"
                placeholder="Program of Interest"
                options={PROGRAMS}
                wrapperClass="col-span-2"
                error={errors.program}
                onClear={() => clearFieldError("program")}
              />
              <Select
                name="source"
                placeholder="How did you hear about us?"
                options={SOURCES}
                wrapperClass="col-span-2"
                error={errors.source}
                onClear={() => clearFieldError("source")}
              />

              <div className="col-span-2">
                <Turnstile
                  ref={turnstileRef}
                  siteKey={siteKey}
                  options={{ theme: "dark", size: "flexible" }}
                />
              </div>

              <button
                type="submit"
                disabled={state !== "idle"}
                className="col-span-2 mt-1 inline-flex w-fit items-center justify-center gap-2 rounded-md bg-brand-cyan px-7 py-3 text-sm font-semibold text-brand-purple-deep transition hover:scale-[1.03] hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
              >
                {state === "submitting" ? (
                  <>
                    <Spinner /> Submitting…
                  </>
                ) : (
                  "Apply Now"
                )}
              </button>
            </form>
          </div>

          <div className="relative order-1 min-h-[280px] overflow-hidden lg:order-2 lg:min-h-full">
            <img
              src="/images/enrollment.jpg"
              alt="Trainees collaborating"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Input({
  name,
  placeholder,
  type = "text",
  wrapperClass = "",
  error,
  onClear,
}: Readonly<{
  name: string;
  placeholder: string;
  type?: string;
  wrapperClass?: string;
  error?: string;
  onClear?: () => void;
}>) {
  return (
    <div className={wrapperClass}>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onClear}
        aria-invalid={error ? true : undefined}
        className={`w-full rounded-md border bg-white/[0.07] px-4 py-3 text-sm text-white placeholder:text-white/60 outline-none transition focus:ring-2 ${
          error
            ? "border-red-400 ring-1 ring-red-400/40 focus:border-red-400 focus:ring-red-400/40"
            : "border-white/15 focus:border-brand-cyan focus:ring-brand-cyan/40"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
    </div>
  );
}

function Select({
  name,
  placeholder,
  options,
  wrapperClass = "",
  error,
  onClear,
}: Readonly<{
  name: string;
  placeholder: string;
  options: { value: string; label: string }[];
  wrapperClass?: string;
  error?: string;
  onClear?: () => void;
}>) {
  return (
    <div className={wrapperClass}>
      <div className="relative">
        <select
          name={name}
          defaultValue=""
          onChange={onClear}
          aria-invalid={error ? true : undefined}
          className={`w-full appearance-none rounded-md border bg-white/[0.07] px-4 py-3 pr-9 text-sm text-white/90 outline-none transition focus:ring-2 ${
            error
              ? "border-red-400 ring-1 ring-red-400/40 focus:border-red-400 focus:ring-red-400/40"
              : "border-white/15 focus:border-brand-cyan focus:ring-brand-cyan/40"
          }`}
        >
          <option value="" disabled className="text-black/60">
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value} className="text-black">
              {o.label}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
      {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
    </div>
  );
}

function Spinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      className="h-4 w-4 animate-spin"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 11-6.219-8.56" strokeLinecap="round" />
    </svg>
  );
}
