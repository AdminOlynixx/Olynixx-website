import { NextResponse } from "next/server";
import { isCtaSource } from "@/lib/cta";

const WINDOW_MS = 60_000;
const MAX = 8;
const hits = new Map<string, { count: number; start: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.start > WINDOW_MS) {
    hits.set(ip, { count: 1, start: now });
    return true;
  }
  rec.count += 1;
  return rec.count <= MAX;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!rateLimit(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const source = String(body.source || "individual");
  if (!name || !email || !email.includes("@") || body.consent !== true) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  const payload = {
    name,
    email,
    organisation: String(body.organisation || "").trim(),
    phone: String(body.phone || "").trim(),
    message: String(body.message || "").trim(),
    source: isCtaSource(source) ? source : "individual",
    receivedAt: new Date().toISOString(),
  };

  const inbox = process.env.LEADS_INBOX;
  const apiKey = process.env.RESEND_API_KEY;

  if (inbox && apiKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Olynixx website <noreply@olynixx.com>",
        to: [inbox],
        subject: `Website enquiry · ${payload.source} · ${payload.name}`,
        text: [
          `Source: ${payload.source}`,
          `Name: ${payload.name}`,
          `Email: ${payload.email}`,
          `Organisation: ${payload.organisation || "-"}`,
          `Phone: ${payload.phone || "-"}`,
          "",
          payload.message || "(no message)",
        ].join("\n"),
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: "mail_failed" }, { status: 502 });
    }
  } else {
    console.info("[lead]", payload);
  }

  return NextResponse.json({ ok: true });
}
