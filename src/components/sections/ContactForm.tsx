"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle } from "lucide-react";
import { CONTACT } from "@/content/contact";
import { CONTACT_AUDIENCES, audienceFromSource, isCtaSource, trackCta } from "@/lib/cta";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name."),
  organisation: z.string(),
  email: z
    .string()
    .trim()
    .refine((v) => v.includes("@"), "Please enter a valid email address."),
  phone: z.string(),
  audience: z.string(),
  message: z.string(),
  website: z.string(),
  consent: z.boolean().refine((v) => v === true, CONTACT.fields.consentError),
});

type FormValues = z.infer<typeof schema>;

const field =
  "block w-full min-h-[48px] border border-rule bg-paper px-4 py-3 text-ink placeholder:text-ink-muted/60 focus:border-gold-text";
const label = "mb-2 block text-sm font-medium text-ink";
const err = "mt-2 flex items-start gap-2 text-sm text-band-low";

export function ContactForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const incoming = searchParams.get("source");
  const pos = searchParams.get("pos") || "form";
  const [failed, setFailed] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      organisation: "",
      email: "",
      phone: "",
      audience: audienceFromSource(incoming),
      message: "",
      website: "",
      consent: false,
    },
  });

  useEffect(() => {
    setValue("audience", audienceFromSource(incoming));
  }, [incoming, setValue]);

  async function onSubmit(values: FormValues) {
    setFailed(false);
    const source = isCtaSource(incoming) ? incoming : values.audience;
    try {
      trackCta("contact_submit", { source, audience: values.audience, pos });
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          organisation: values.organisation || undefined,
          email: values.email,
          phone: values.phone || undefined,
          message: values.message || undefined,
          source,
          pos,
          website: values.website,
          consent: true,
        }),
      });
      if (!res.ok) throw new Error("send failed");
      router.push("/contact/thank-you");
    } catch {
      setFailed(true);
    }
  }

  const fieldError = (msg?: string, id?: string) =>
    msg ? (
      <p id={id} role="alert" className={err}>
        <AlertCircle size={16} strokeWidth={1.6} aria-hidden className="mt-0.5 shrink-0" />
        {msg}
      </p>
    ) : null;

  const audienceReg = register("audience");

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">
            {CONTACT.fields.name}
          </label>
          <input
            id="name"
            className={field}
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {fieldError(errors.name?.message, "name-error")}
        </div>
        <div>
          <label className={label} htmlFor="organisation">
            {CONTACT.fields.organisation}{" "}
            <span className="font-normal text-ink-muted">({CONTACT.fields.organisationHint})</span>
          </label>
          <input id="organisation" className={field} autoComplete="organization" {...register("organisation")} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className={label} htmlFor="email">
            {CONTACT.fields.email}
          </label>
          <input
            id="email"
            type="email"
            className={field}
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {fieldError(errors.email?.message, "email-error")}
        </div>
        <div>
          <label className={label} htmlFor="phone">
            {CONTACT.fields.phone}
          </label>
          <input id="phone" type="tel" className={field} autoComplete="tel" {...register("phone")} />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="audience">
          {CONTACT.fields.audience}
        </label>
        <select
          id="audience"
          className={field}
          {...audienceReg}
          onChange={(e) => {
            void audienceReg.onChange(e);
            trackCta("contact_route", { audience: e.target.value });
          }}
        >
          {CONTACT_AUDIENCES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={label} htmlFor="message">
          {CONTACT.fields.message}
        </label>
        <textarea id="message" rows={5} className={field} {...register("message")} />
      </div>

      <div>
        <label className="flex min-h-[44px] cursor-pointer items-start gap-3 text-[15px] text-ink-muted">
          <input
            type="checkbox"
            className="mt-1 h-5 w-5 shrink-0 accent-[#146b58]"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            {...register("consent")}
          />
          <span>
            {CONTACT.fields.consent}{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-gold-text">
              Read the privacy notice
            </Link>
            .
          </span>
        </label>
        {fieldError(errors.consent?.message, "consent-error")}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-[52px] items-center justify-center bg-gold px-8 text-[15px] font-medium text-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? CONTACT.fields.sending : CONTACT.fields.submit}
      </button>

      {failed ? (
        <p role="alert" className={err}>
          <AlertCircle size={16} strokeWidth={1.6} aria-hidden className="mt-0.5 shrink-0" />
          {CONTACT.fields.error}
        </p>
      ) : null}
    </form>
  );
}
