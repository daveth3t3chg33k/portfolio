# portfolio

Portfolio for Dave Kamirah — Next.js 15 App Router, Tailwind v4.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

## Contact form

The form posts to `/api/contact`, which mails the submission through
[Resend](https://resend.com) from the server, so the API key never reaches the
browser. Copy `.env.example` to `.env.local` and fill it in:

| variable | purpose |
| --- | --- |
| `RESEND_API_KEY` | API key from resend.com/api-keys |
| `CONTACT_TO` | inbox that receives enquiries (defaults to the site email) |
| `CONTACT_FROM` | sender; `onboarding@resend.dev` works before a domain is verified |
| `RESEND_API_URL` | optional endpoint override for local stubs |

Without `RESEND_API_KEY` the endpoint answers `501` and the form hands the
typed message back as a mailto draft instead of pretending it was sent.

## Work screenshots

`public/work/*.webp` are real captures, refreshed with:

```bash
node scripts/capture-work-shots.mjs [slug ...]
```

It needs a local Chrome and the `sharp` dev dependency; projects with no live
deployment deliberately use the typographic plate instead of a capture.
