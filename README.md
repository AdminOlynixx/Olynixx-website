# Olynixx website

Public marketing site for Olynixx. Staging stays password-protected and `noindex` until written launch approval.

## Local

```bash
cp .env.example .env.local
npm install
npm run dev
```

Fonts and lockups are self-hosted from `public/`. Do not load type from Google's CDN.

## Staging

Set these on the host (Vercel or equivalent). Do not ship a public domain until Jef's written launch approval.

```
NOINDEX=true
PUBLISH_PUREHEALTH=false
PUBLISH_ISO_BADGES=false
PUBLISH_LONGEVITY=false
PUBLISH_ENTITY=false
STAGING_USER=...
STAGING_PASSWORD=...
SITE_URL=https://your-staging-host
LEADS_INBOX=...
RESEND_API_KEY=...
```

Deploy:

```bash
npx vercel --yes
```

Then add the env values in the Vercel project settings and redeploy. Basic auth only engages when both `STAGING_USER` and `STAGING_PASSWORD` are set.

## Guardrails

- Footer disclaimer is verbatim on every page.
- PureHealth block compiles but stays unpublished (`PUBLISH_PUREHEALTH=false`).
- Legal entity and public contact are env values, not hardcoded strings. Entity stays off public pages until `PUBLISH_ENTITY=true`.
- Nothing goes into a portfolio before written launch approval.
