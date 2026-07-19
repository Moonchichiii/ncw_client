# Security Policy

## Scope

This repository contains the source of nordiccodeworks.com, a static
React SPA deployed on Netlify. There is no server-side application code
in this repository; the only user input path is the contact form,
handled by Netlify Forms.

## Supported versions

Only the currently deployed `main` branch is supported.

## Reporting a vulnerability

Email **contact@nordiccodeworks.com** with subject line `SECURITY`.
Please include reproduction steps. You can expect an acknowledgement
within 72 hours. Please do not open public issues for security reports
before a fix is deployed.

## Security controls (high level)

- Strict security headers (CSP with `frame-ancestors 'none'`, HSTS,
  `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`)
  configured in `netlify.toml`.
- No inline or third-party scripts; `script-src 'self'`.
- Contact form: honeypot field (checked by Netlify server-side),
  minimum-fill-time check, schema validation with length limits on
  every field, generic responses that do not reveal bot detection.
- Dependencies pinned via `bun.lock`; automated weekly Dependabot
  updates; CodeQL analysis and dependency review on every PR.
- No secrets in the repository. The only build-time variable is a
  public Cloudinary cloud name (see `.env.example`).

## Known trade-offs

- `style-src 'unsafe-inline'` is required for critical CSS in
  `index.html` and React inline style attributes. Scripts remain
  restricted to `'self'`.
- This is a static site: header enforcement depends on the Netlify
  edge, and external verification of the deployed headers should be
  re-run after infrastructure changes.
