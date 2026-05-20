import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { DisposableEmailValidator } from "disposable-email-validator";
import { enrollmentSchema } from "@/lib/validation";
import { supabaseAdmin } from "@/lib/supabase";
import { hashIp, clientIpFromHeaders } from "@/lib/ip-hash";

export const runtime = "nodejs";

const ENROLL_IP_SALT: string = (() => {
  const v = process.env.ENROLL_IP_SALT;
  if (!v) {
    throw new Error(
      "Missing ENROLL_IP_SALT environment variable — set a random hex string in .env.local"
    );
  }
  return v;
})();

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const _disposableValidator = new DisposableEmailValidator("production", {
  production: {
    rules: { allow_disposable_emails: false, allow_plus_addressing: true },
  },
});
function isDisposableEmail(email: string): boolean {
  return !_disposableValidator.validateEmail(email).success;
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("[enroll] TURNSTILE_SECRET_KEY not set");
    return false;
  }
  const body = new URLSearchParams();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", body });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch (e) {
    console.error("[enroll] turnstile verify error:", e);
    return false;
  }
}

function extractTurnstileToken(body: unknown): string | null {
  if (typeof body !== "object" || body === null) return null;
  const t = (body as Record<string, unknown>).turnstile_token;
  return typeof t === "string" && t.length >= 10 ? t : null;
}

export async function POST(req: NextRequest) {
  // 1. Parse JSON
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // 2. Honeypot — short-circuit silently
  if (
    typeof body === "object" &&
    body !== null &&
    "hp" in body &&
    typeof (body as Record<string, unknown>).hp === "string" &&
    ((body as Record<string, string>).hp).length > 0
  ) {
    return NextResponse.json({ ok: true });
  }

  // 3. Turnstile — extract token from the raw body (we haven't Zod'd yet)
  const token = extractTurnstileToken(body);
  if (!token) {
    return NextResponse.json(
      { error: "Verification failed. Please refresh and try again." },
      { status: 400 }
    );
  }

  const ip = clientIpFromHeaders(req.headers);
  const turnstileOk = await verifyTurnstile(token, ip);
  if (!turnstileOk) {
    return NextResponse.json(
      { error: "Verification failed. Please refresh and try again." },
      { status: 400 }
    );
  }

  // 4. Zod
  const parsed = enrollmentSchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString() ?? "_";
      if (!errors[key]) errors[key] = issue.message;
    }
    return NextResponse.json({ errors }, { status: 400 });
  }
  const data = parsed.data;

  // 5. Disposable email
  if (isDisposableEmail(data.email)) {
    return NextResponse.json(
      { error: "Please use a non-disposable email address." },
      { status: 400 }
    );
  }

  // 6. Metadata
  const ip_hash = hashIp(ip, ENROLL_IP_SALT);
  const user_agent = (req.headers.get("user-agent") ?? "").slice(0, 255);

  // 7. Insert
  const { error } = await supabaseAdmin.from("enrollments").insert({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    phone: data.phone,
    program: data.program,
    source: data.source ?? null,
    ip_hash,
    user_agent,
  });

  if (error) {
    // 23505 = Postgres unique_violation — email already submitted.
    if (error.code === "23505") {
      return NextResponse.json(
        {
          error:
            "We already have an application from this email. Our team will reach out shortly.",
        },
        { status: 409 }
      );
    }
    console.error("[enroll] supabase insert failed:", error);
    return NextResponse.json(
      { error: "Could not save your application. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { ok: true },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
