# Ask Nish

Clean Apple-style app: enter email, ask questions. Submissions are emailed to **pithia@adobe.com**.

## Run locally

```bash
npm install
cp .env.local.example .env.local
# Add your Resend API key to .env.local (get one at https://resend.com)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Push this repo to GitHub (if not already).
2. Go to [vercel.com](https://vercel.com) → Add New Project → Import this repo.
3. Add **Environment Variables** in the Vercel project:
   - `RESEND_API_KEY` = your Resend API key
   - `RESEND_FROM` = `Ask Nish <noreply@yourdomain.com>` (use an address on a domain you verify in Resend)
4. Deploy. Your app will be at `https://your-project.vercel.app` (or your custom domain).

## Email (Resend) – sending to pithia@adobe.com

Resend’s test mode only allows sending to your account email. To send to **pithia@adobe.com**:

1. Go to [resend.com/domains](https://resend.com/domains) and **verify a domain** you control (e.g. a personal domain or a subdomain).
2. In Vercel (or `.env.local`), set **`RESEND_FROM`** to an address on that domain, e.g. `Ask Nish <noreply@yourdomain.com>`.
3. After that, the app can send to any recipient, including pithia@adobe.com.
# nishapp
