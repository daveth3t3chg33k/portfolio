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

## Work images

Two kinds of plate, kept deliberately separate:

- `public/work/*.webp` — real captures of live deployments, refreshed with

```bash
node scripts/capture-work-shots.mjs [slug ...]
```

- `public/work/covers/*.webp` — a cover drawn for every project, generated with

```bash
node scripts/generate-project-covers.mjs [slug ...]
```

Both need the `sharp` dev dependency (the captures also need local Chrome).
Covers are deterministic geometry seeded from the slug — artwork, not
screenshots, and the caption on the plate says so. A real capture always wins:
a project with a live URL shows its screenshot on the case page and in the
work index. Projects without a deployment print their cover plate instead.
