import { createHash } from "node:crypto";

export function hashIp(ip: string, salt: string): string {
  return createHash("sha256").update(ip + salt).digest("hex");
}

export function clientIpFromHeaders(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "";
}
