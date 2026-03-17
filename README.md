# Ask Nish

Questions are emailed to **npithia@gmail.com** by default (no custom domain needed).

## Run locally

```bash
npm install
cp .env.local.example .env.local
# RESEND_API_KEY from https://resend.com — sign up with npithia@gmail.com
npm run dev
```

## Vercel

Env vars:

- **`RESEND_API_KEY`** — required
- **`ASK_NISH_TO_EMAIL`** — optional; default `npithia@gmail.com`. With Resend’s free `onboarding@resend.dev` sender, this **must be the same email you use for your Resend account**.

Redeploy after changing env.

## Later: send to another address (e.g. Adobe)

Verify a domain in [Resend](https://resend.com/domains), set `RESEND_FROM` to an address on that domain, and set `ASK_NISH_TO_EMAIL` to the recipient you want.
