## SaaS Landing Experience (Next.js)

The `frontend` app is a composable landing-page shell that renders Strapi-powered sections per domain. Every request is resolved using the `Host` header + path, so a single deployment can serve 100+ branded landing pages.

### Key features

- **Domain aware routing** – `app/[...slug]/page.js` inspects the incoming host and fetches the right `landing-page` entry from Strapi.
- **Template driven UI** – Strapi dynamic-zones map to React section components (`Hero`, `FeatureGrid`, `Testimonials`, `CtaBanner`).
- **Per-domain GTM** – Each entry stores its own GTM container ID that is injected via `GtmScript`.
- **Graceful fallbacks** – If Strapi is offline, a pre-built demo template renders so the app still boots.

### Environment variables

Copy `.env.example` to `.env.local` and adjust as needed:

```dotenv
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=...
DEFAULT_DOMAIN=demo.localhost
LANDING_PAGE_REVALIDATE=60
```

> `DEFAULT_DOMAIN` lets you preview content locally when requests do not include a Host header (e.g., `npm run dev`).

### Development

```bash
cd frontend
npm install
npm run dev
```

- Visit `http://localhost:3000` and point your hosts file to simulate additional domains, e.g. `127.0.0.1 demo.localhost`.
- Update content inside Strapi (`landing-pages`, `landing-templates`) and the frontend will revalidate automatically (configurable via `LANDING_PAGE_REVALIDATE`).

### Production build

```bash
npm run build
npm start
```

Deploy anywhere that supports Next.js (Vercel, AWS, etc.). Remember to map every custom domain to the deployment and surface the same env vars used locally.
