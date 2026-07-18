"use client";

import * as React from "react";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { companies } from "@/lib/companies";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  /** Honeypot — hidden from humans, filled by bots. */
  website: string;
}

const inputClasses =
  "w-full rounded-sm border border-line-200 bg-paper-0 px-4 py-3 text-ink-700 placeholder:text-ink-500/60 focus-visible:border-accent-700";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          theme?: string;
        },
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

/** Invisible-friendly Cloudflare Turnstile widget; renders nothing until the site key is configured. */
function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const rendered = React.useRef(false);

  const render = React.useCallback(() => {
    if (!TURNSTILE_SITE_KEY || rendered.current || !ref.current || !window.turnstile) return;
    rendered.current = true;
    window.turnstile.render(ref.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: "light",
      callback: onToken,
      "expired-callback": () => onToken(""),
    });
  }, [onToken]);

  React.useEffect(() => {
    render();
  }, [render]);

  if (!TURNSTILE_SITE_KEY) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        onLoad={render}
        strategy="lazyOnload"
      />
      <div ref={ref} />
    </>
  );
}

/**
 * Contact form with visible labels and inline (not color-only) validation —
 * docs/06-components.md. Reads `?company=` / `?subject=` from the URL itself
 * (via useSearchParams, inside a Suspense boundary) so the page stays static.
 */
export function ContactForm() {
  const searchParams = useSearchParams();
  const defaultCompany = searchParams.get("company") ?? "";
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = React.useState("");
  /** When the form mounted — bots submit in milliseconds, humans don't. */
  const startedAt = React.useRef(Date.now());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { company: defaultCompany, website: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("sending");
    setServerError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          elapsedMs: Date.now() - startedAt.current,
          turnstileToken,
        }),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }
      setStatus("sent");
      reset({ company: defaultCompany, website: "" });
    } catch (error) {
      setStatus("error");
      setServerError(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-md border border-line-200 bg-paper-50 p-8" role="status">
        <p className="text-h3 font-display text-ink-900">Message received.</p>
        <p className="mt-2 text-ink-500">
          Thank you for getting in touch — the right team will respond as soon
          as possible.
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-ink-900">
            Full name
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={cn(inputClasses, errors.name && "border-sector-automotive")}
            {...register("name", { required: "Please enter your name." })}
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1.5 text-sm text-sector-automotive">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-ink-900">
            Email address
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={cn(inputClasses, errors.email && "border-sector-automotive")}
            {...register("email", {
              required: "Please enter your email address.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address.",
              },
            })}
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1.5 text-sm text-sector-automotive">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-ink-900">
            Phone <span className="font-normal text-ink-500">(optional)</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            className={inputClasses}
            {...register("phone")}
          />
        </div>

        <div>
          <label htmlFor="contact-company" className="mb-1.5 block text-sm font-medium text-ink-900">
            Which company is this about?
          </label>
          <select id="contact-company" className={inputClasses} {...register("company")}>
            <option value="">The group / general enquiry</option>
            {companies.map((company) => (
              <option key={company.slug} value={company.slug}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-ink-900">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={6}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cn(inputClasses, "resize-y", errors.message && "border-sector-automotive")}
          {...register("message", {
            required: "Please enter a message.",
            minLength: { value: 10, message: "Please tell us a little more (at least 10 characters)." },
          })}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 text-sm text-sector-automotive">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot field — visually hidden and skipped by screen readers/tab order. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <Turnstile onToken={setTurnstileToken} />

      {status === "error" && serverError && (
        <p role="alert" className="rounded-sm border border-sector-automotive/40 bg-sector-automotive/5 px-4 py-3 text-sm text-ink-700">
          {serverError}
        </p>
      )}

      <div>
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
