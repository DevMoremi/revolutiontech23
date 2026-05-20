import { describe, it, expect } from "vitest";
import { hashIp, clientIpFromHeaders } from "../ip-hash";

describe("hashIp", () => {
  it("is deterministic for the same ip + salt", () => {
    expect(hashIp("1.2.3.4", "salt")).toBe(hashIp("1.2.3.4", "salt"));
  });

  it("changes when the salt changes", () => {
    expect(hashIp("1.2.3.4", "salt-a")).not.toBe(hashIp("1.2.3.4", "salt-b"));
  });

  it("changes when the ip changes", () => {
    expect(hashIp("1.2.3.4", "salt")).not.toBe(hashIp("5.6.7.8", "salt"));
  });

  it("produces a 64-char hex digest even for empty input", () => {
    expect(hashIp("", "salt")).toMatch(/^[a-f0-9]{64}$/);
  });
});

describe("clientIpFromHeaders", () => {
  it("returns the first entry of x-forwarded-for", () => {
    const h = new Headers({ "x-forwarded-for": "1.2.3.4, 5.6.7.8" });
    expect(clientIpFromHeaders(h)).toBe("1.2.3.4");
  });

  it("trims whitespace around the value", () => {
    const h = new Headers({ "x-forwarded-for": "  1.2.3.4  " });
    expect(clientIpFromHeaders(h)).toBe("1.2.3.4");
  });

  it("falls back to x-real-ip when x-forwarded-for is absent", () => {
    const h = new Headers({ "x-real-ip": "9.9.9.9" });
    expect(clientIpFromHeaders(h)).toBe("9.9.9.9");
  });

  it("returns empty string when neither header is present", () => {
    expect(clientIpFromHeaders(new Headers())).toBe("");
  });
});
