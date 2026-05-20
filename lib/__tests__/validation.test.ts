import { describe, it, expect } from "vitest";
import { enrollmentSchema } from "../validation";

const valid = {
  first_name: "Ada",
  last_name: "Lovelace",
  email: "ada@example.com",
  phone: "08012345678",
  program: "diploma-in-data-science" as const,
  source: "instagram" as const,
  hp: "",
  turnstile_token: "x".repeat(20),
};

describe("enrollmentSchema", () => {
  it("accepts a valid payload", () => {
    expect(enrollmentSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects first_name shorter than 3 chars", () => {
    const res = enrollmentSchema.safeParse({ ...valid, first_name: "Ad" });
    expect(res.success).toBe(false);
  });

  it("rejects last_name shorter than 3 chars", () => {
    const res = enrollmentSchema.safeParse({ ...valid, last_name: "Lo" });
    expect(res.success).toBe(false);
  });

  it("rejects invalid emails", () => {
    const res = enrollmentSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(res.success).toBe(false);
  });

  it("rejects non-Nigerian phone formats", () => {
    const bad = [
      "1234",
      "+2348012345678",
      "0801234567",      // 10 digits
      "080123456789",    // 12 digits
      "08012345678a",    // trailing letter
      "18012345678",     // doesn't start with 0
    ];
    for (const phone of bad) {
      const res = enrollmentSchema.safeParse({ ...valid, phone });
      expect(res.success, `expected ${phone} to fail`).toBe(false);
    }
  });

  it("accepts the canonical Nigerian phone format", () => {
    expect(enrollmentSchema.safeParse({ ...valid, phone: "08012345678" }).success).toBe(true);
  });

  it("rejects an unknown program slug", () => {
    const res = enrollmentSchema.safeParse({ ...valid, program: "underwater-basketweaving" as any });
    expect(res.success).toBe(false);
  });

  it("treats source as optional", () => {
    const { source: _omit, ...rest } = valid;
    expect(enrollmentSchema.safeParse(rest).success).toBe(true);
  });

  it("rejects a non-empty honeypot", () => {
    const res = enrollmentSchema.safeParse({ ...valid, hp: "I am a bot" });
    expect(res.success).toBe(false);
  });

  it("requires a turnstile_token of at least 10 chars", () => {
    expect(
      enrollmentSchema.safeParse({ ...valid, turnstile_token: "short" }).success
    ).toBe(false);
  });

  it("normalizes email to lowercase", () => {
    const res = enrollmentSchema.safeParse({ ...valid, email: "Ada@Example.COM" });
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.email).toBe("ada@example.com");
    }
  });
});
