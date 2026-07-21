import { NextResponse } from "next/server";
import { Resend } from "resend";

import { companies } from "@/lib/companies";

/**
 * Contact form endpoint. Sends via Resend when RESEND_API_KEY and
 * CONTACT_TO_EMAIL are configured; returns 503 otherwise so the client
 * can show a graceful "email us directly" fallback.
 */

/** Best-effort per-IP rate limit (per serverless instance): 5 sends / 10 min. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Opportunistic cleanup so the map can't grow unbounded.
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT;
}

export async function POST(request: Request) {
  // Same-origin check — blocks cross-site scripted posts to this endpoint.
  const origin = request.headers.get("origin");
  if (origin) {
    const host = request.headers.get("host");
    let originHost: string | null = null;
    try {
      originHost = new URL(origin).host;
    } catch {
      originHost = null;
    }
    if (!originHost || originHost !== host) {
      return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    }
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages in a short time. Please try again later." },
      { status: 429 },
    );
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, company, message, website, elapsedMs, turnstileToken } =
    (body ?? {}) as Record<string, unknown>;

  // Honeypot — bots fill every field; humans never see this one.
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Timing check — humans take more than 3 seconds to fill a five-field form.
  if (typeof elapsedMs !== "number" || elapsedMs < 3000) {
    return NextResponse.json(
      { error: "Please take a moment to review your message and try again." },
      { status: 400 },
    );
  }

  // Cloudflare Turnstile — verified server-side when configured.
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    if (typeof turnstileToken !== "string" || !turnstileToken) {
      return NextResponse.json(
        { error: "Please complete the human verification and try again." },
        { status: 400 },
      );
    }
    const verification = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: turnstileToken,
          remoteip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
        }),
      },
    ).then((res) => res.json() as Promise<{ success: boolean }>);

    if (!verification.success) {
      return NextResponse.json(
        { error: "Human verification failed. Please try again." },
        { status: 400 },
      );
    }
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    name.trim().length < 2 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    message.trim().length < 10
  ) {
    return NextResponse.json(
      { error: "Please provide your name, a valid email address, and a message." },
      { status: 400 },
    );
  }

  // Length caps — reject absurd payloads outright.
  if (
    name.length > 100 ||
    email.length > 200 ||
    (typeof phone === "string" && phone.length > 50) ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { error: "Your message is too long — please keep it under 5,000 characters." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return NextResponse.json(
      { error: "The contact form is not yet configured. Please email us directly." },
      { status: 503 },
    );
  }

  const companyName =
    typeof company === "string"
      ? companies.find((c) => c.slug === company)?.name ?? "General enquiry"
      : "General enquiry";

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Niiplants Group Website <website@niiplantsgroup.com>",
    to,
    replyTo: email,
    subject: `Website enquiry — ${companyName}`,
    text: [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      typeof phone === "string" && phone.trim() ? `Phone: ${phone.trim()}` : null,
      `Regarding: ${companyName}`,
      "",
      message.trim(),
    ]
      .filter((line): line is string => line !== null)
      .join("\n"),
  });

  if (error) {
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
