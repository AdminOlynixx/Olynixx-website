"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle } from "react-feather";
import { CONTACT } from "@/content/contact";
import {
  CONTACT_AUDIENCES,
  audienceFromSource,
  isCtaSource,
  trackCta,
  type ContactAudience,
} from "@/lib/cta";

export function ContactForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const incoming = searchParams.get("source");
  const [form, setForm] = useState({
    name: "",
    organisation: "",
    email: "",
    phone: "",
    audience: audienceFromSource(incoming) as ContactAudience,
    message: "",
    website: "",
    consent: false,
  });
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [consentError, setConsentError] = useState(false);

  useEffect(() => {
    setForm((prev) => ({ ...prev, audience: audienceFromSource(incoming) }));
  }, [incoming]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.consent) {
      setConsentError(true);
      return;
    }
    if (!form.name.trim() || !form.email.includes("@")) {
      setStatus("error");
      return;
    }
    setConsentError(false);
    setStatus("sending");
    const source = isCtaSource(incoming) ? incoming : form.audience;
    const pos = searchParams.get("pos") || "form";
    try {
      trackCta("contact_submit", { source, audience: form.audience, pos });
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          organisation: form.organisation || undefined,
          email: form.email,
          phone: form.phone || undefined,
          message: form.message || undefined,
          source,
          website: form.website,
          consent: true,
        }),
      });
      if (!res.ok) throw new Error("send failed");
      router.push("/contact/thank-you");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="ol-form" onSubmit={onSubmit} noValidate>
      <div className="ol-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          hidden
          value={form.website}
          onChange={(e) => setForm((prev) => ({ ...prev, website: e.target.value }))}
        />
      </div>

      <div className="ol-form-row">
        <div className="ol-field">
          <label className="ol-label" htmlFor="name">
            {CONTACT.fields.name}
          </label>
          <input
            className="ol-input"
            id="name"
            name="name"
            autoComplete="name"
            required
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div className="ol-field">
          <label className="ol-label" htmlFor="email">
            {CONTACT.fields.email}
          </label>
          <input
            className="ol-input"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          />
        </div>
      </div>

      <div className="ol-form-row">
        <div className="ol-field">
          <label className="ol-label" htmlFor="organisation">
            {CONTACT.fields.organisation}{" "}
            <span className="ol-label-hint">{CONTACT.fields.organisationHint}</span>
          </label>
          <input
            className="ol-input"
            id="organisation"
            name="organisation"
            autoComplete="organization"
            value={form.organisation}
            onChange={(e) => setForm((prev) => ({ ...prev, organisation: e.target.value }))}
          />
        </div>

        <div className="ol-field">
          <label className="ol-label" htmlFor="phone">
            {CONTACT.fields.phone} <span className="ol-label-hint">{CONTACT.fields.organisationHint}</span>
          </label>
          <input
            className="ol-input"
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
          />
        </div>
      </div>

      <div className="ol-field">
        <label className="ol-label" htmlFor="audience">
          {CONTACT.fields.audience}
        </label>
        <select
          className="ol-select"
          id="audience"
          name="audience"
          value={form.audience}
          onChange={(e) => {
            const audience = e.target.value as ContactAudience;
            setForm((prev) => ({ ...prev, audience }));
            trackCta("contact_route", { audience });
          }}
        >
          {CONTACT_AUDIENCES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="ol-field">
        <label className="ol-label" htmlFor="message">
          {CONTACT.fields.message}
        </label>
        <textarea
          className="ol-textarea"
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
        />
      </div>

      <div className="ol-field">
        <label className="ol-check">
          <input
            type="checkbox"
            name="consent"
            checked={form.consent}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, consent: e.target.checked }));
              if (e.target.checked) setConsentError(false);
            }}
          />
          <span>
            {CONTACT.fields.consent}{" "}
            <Link href="/privacy">Read the privacy notice</Link>.
          </span>
        </label>
        {consentError ? <p className="ol-error">{CONTACT.fields.consentError}</p> : null}
      </div>

      <button className="ol-btn ol-btn--primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? CONTACT.fields.sending : CONTACT.fields.submit}
      </button>

      {status === "error" ? (
        <p className="ol-form-status ol-error">
          <AlertCircle size={16} strokeWidth={1.6} aria-hidden />
          {CONTACT.fields.error}
        </p>
      ) : null}
    </form>
  );
}
