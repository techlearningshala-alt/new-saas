## Multi-domain Landing Page SaaS

This repo contains a full-stack reference for operating 100+ marketing landing pages from a single codebase:

- `frontend/` – Next.js 15 (App Router, JavaScript, Tailwind) that renders template-based sections per domain and injects domain-specific GTM tags.
- `backend/` – Strapi 5 + MySQL with content types for `landing-pages`, `landing-templates`, and reusable section components. It seeds demo data on bootstrap.

### Quick start

```bash
# Backend (Strapi + MySQL)
cp backend/.env.example backend/.env   # edit MySQL + secret values
cd backend
npm install
npm run develop

# Frontend (Next.js)
cp frontend/.env.example frontend/.env.local   # add STRAPI_API_TOKEN from Strapi admin
cd ../frontend
npm install
npm run dev
```

Visit `http://localhost:3000` and map the sample domains in your hosts file:

```
127.0.0.1 demo.localhost
127.0.0.1 campaign.localhost
```

Requests to `demo.localhost:3000/` and `campaign.localhost:3000/summer` will now render the seeded pages. Editors can add more landing pages inside Strapi by specifying the `domain`, `path`, `template`, and `gtmContainerId`.

### How it works

- **Template-driven sections** – Strapi dynamic zones list hero / feature / testimonial / CTA components. The Next.js app maps each section to a React component inside `src/components/sections`.
- **Domain-aware fetch layer** – `getLandingPage()` reads the `Host` header on every request, queries Strapi via REST filters, and falls back to a static template if Strapi is unreachable.
- **MySQL-ready Strapi** – `config/database.ts` defaults to MySQL, installs the `mysql2` driver, and exposes pool/env knobs for production deployments.
- **Google Tag Manager isolation** – Every landing page owns its GTM container ID which the frontend injects via `GtmScript`, keeping analytics per domain.

### Next steps

- Secure the Strapi public API role or proxy all traffic through Next.js route handlers.
- Extend the components directory with additional sections (pricing tables, FAQs, contact forms).
- Configure CI/CD so both apps deploy together; treat Strapi as the source of truth for marketing teams while the Next.js app handles presentation at scale.
