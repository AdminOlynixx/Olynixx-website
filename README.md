# Olynixx website

Public marketing site for Olynixx. Staging is `https://olynixwebsite.vercel.app`. The site stays `noindex` and unpublished as a public domain until written launch approval.

This folder is the GitHub project (`Olynixx/olynixwebsite`). Push from here, not from a parent directory.

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

Opens at `http://localhost:3000`. Fonts and lockups are self-hosted from `public/`. Do not load type from Google's CDN.

`.env.local` is gitignored. Never commit `RESEND_API_KEY`, `STAGING_PASSWORD`, or inbox addresses.

## Contact form

`POST /api/contact` (`src/app/api/contact/route.ts`).

- Every enquiry carries a `source` tag (which door or CTA sent it).
- If both `LEADS_INBOX` and `RESEND_API_KEY` are set, Resend emails the inbox from `Olynixx website <noreply@olynixx.com>`. That from-address needs a verified Resend domain.
- If either value is missing, the handler logs `[lead]` to the server console and still returns success. Local posts do not go to Outlook unless those two values are set.
- Empty public contact slots render nothing. The registered entity address is not a contact address.

## Environment variables

Copy names from `.env.example`. Public contact and entity values below are the signed staging set. Share secrets out of band (1Password, Vercel env, or a private channel). Do not put keys in email or in this file.

### Secrets (share securely)

| Variable | Purpose |
|---|---|
| `STAGING_USER` | HTTP basic-auth user. Blank locally. Staging only. |
| `STAGING_PASSWORD` | HTTP basic-auth password. Both this and `STAGING_USER` must be set before the gate engages. |
| `LEADS_INBOX` | One inbox for every form post. |
| `RESEND_API_KEY` | Resend API key for the contact form. |

### Switches

Defaults below are the current staging intent. A switch is off unless noted.

| Variable | On when | Current staging | Notes |
|---|---|---|---|
| `NOINDEX` | anything except `false` | `true` | Blocks crawlers until launch approval. |
| `PUBLISH_ENTITY` | anything except `false` | `true` | Rise Up Lifestyle Coaching L.L.C. fronts the site until the Olynixx entity at rebrand. |
| `PUBLISH_LONGEVITY` | `true` | `false` | Page exists at `/individuals/longevity`. Word stays off Home, Individuals nav, and sitemap until flipped. |
| `PUBLISH_PRAXIS` | `true` | `false` | Page stays up. Header and footer hide Certification until CPD is signed. |
| `PUBLISH_PUREHEALTH` | `true` | `false` | Block compiles. Unpublished until the partnership is confirmed in writing. |
| `PUBLISH_ISO_BADGES` | `true` | `false` | Stay false until each ISO certificate is issued. |
| `PUBLISH_DC` | `true` | `false` | SW-DC. Partner name and first-in-the-Gulf DC-potential claim. |
| `PUBLISH_BEST` | `true` | `false` | SW-BEST. B-E-St name and branded recovery. |
| `PUBLISH_PEMF` | `true` | `false` | SW-PEMF. No copy until the agreement signs. |
| `PUBLISH_SEAN` | `true` | `false` | Ambassador band and `/sean`. |
| `PHASE_SHOP` | `true` | `false` | No live shop links until flipped. |

### Public site

| Variable | Staging value |
|---|---|
| `SITE_URL` | `https://olynixwebsite.vercel.app` locally use `http://localhost:3000` |
| `SITE_CONTACT_EMAIL` | `olynixx@outlook.com` |
| `SITE_CONTACT_PHONE` | `058 599 7620` |
| `SITE_CONTACT_WHATSAPP` | `058 599 7620` |
| `SITE_CONTACT_ADDRESS` | empty |
| `SITE_CONTACT_MAP` | empty |
| `SITE_CONTACT_SLA` | empty |
| `SITE_CONTACT_CALENDAR` | empty |
| `SITE_ENTITY_NAME` | `Rise Up Lifestyle Coaching L.L.C.` |
| `SITE_ENTITY_LICENCE` | `860518` |
| `SITE_ENTITY_LICENCE_ISSUER` | `DED-Dubai` |
| `SITE_ENTITY_TRN` | `100547489300003` |
| `SITE_ENTITY_ADDRESS` | Office F28, Commercial-8, Saih Shuaib 2, Dubai Industrial City, Dubai, United Arab Emirates |
| `SITE_ENTITY_JURISDICTION` | Dubai, United Arab Emirates |
| `SITE_ENTITY_DATA_CONTROLLER` | Rise Up Lifestyle Coaching L.L.C. |

`src/lib/site-config.ts` also has those public contact and entity values as fallbacks so an empty Vercel env still matches local. Empty optional slots (`ADDRESS`, `MAP`, `SLA`, `CALENDAR`) stay empty.

## Staging host

Set the variables on Vercel (or equivalent). Do not point a public domain here until Jef's written launch approval.

```bash
npx vercel --yes
```

Then set env in the Vercel project and redeploy. Basic auth only engages when both `STAGING_USER` and `STAGING_PASSWORD` are set.

## Guardrails

- Footer disclaimer is verbatim on every page.
- PureHealth, Longevity (nav), Praxis (nav), PEMF, DC, B-E-St, Sean, shop, and ISO badges stay unpublished until their switch is flipped.
- Do not write "Registered" on the entity address until Jef sends that word.
- Nothing goes into a portfolio before written launch approval.
