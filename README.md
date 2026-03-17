# Ask Nish

Questions are sent via **Gmail SMTP** to **npithia@gmail.com** (or `ASK_NISH_TO_EMAIL`). No Resend or custom domain.

## Gmail App Password

1. Google Account → **Security** → **2-Step Verification** (turn on).
2. **App passwords** → generate one for “Mail” / “Other”.
3. Use that 16-char password in `GMAIL_APP_PASSWORD` (no spaces).

## Run locally

```bash
npm install
cp .env.local.example .env.local
# Set GMAIL_USER and GMAIL_APP_PASSWORD
npm run dev
```

## Vercel

Environment variables:

- **`GMAIL_USER`** — e.g. `npithia@gmail.com`
- **`GMAIL_APP_PASSWORD`** — app password from step above
- **`ASK_NISH_TO_EMAIL`** — optional; default `npithia@gmail.com`

Redeploy after changing env.
