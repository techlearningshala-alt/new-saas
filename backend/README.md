# Strapi CMS for the SaaS Landing Platform

This Strapi v5 workspace manages the schema and content for 100+ domain-specific landing pages. It persists data in **MySQL** and exposes all content through the REST API consumed by the Next.js frontend.

## Models & components

- **landing-templates** – reusable dynamic-zone layouts with hero/feature/testimonial/CTA sections and theme palettes.
- **landing-pages** – bind a template + theme to a specific `domain`, `path`, and `gtmContainerId`.
- **Components** – `sections.*` + `blocks.feature/testimonial` + `theme.palette` + `shared.seo`.

During bootstrap, Strapi seeds one default template plus two sample landing pages (`demo.localhost` and `campaign.localhost`) so the frontend has content immediately.

## Configuration

1. Duplicate `.env.example` to `.env`.
2. Point the values to an accessible MySQL instance (local Docker, RDS, PlanetScale, etc.).

```dotenv
DATABASE_CLIENT=mysql
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_NAME=landing_platform
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi
DATABASE_SSL=false
```

> Provide strong secrets for `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, etc., before deploying.

Install deps and start Strapi:

```bash
cd backend
npm install
npm run develop
```

When the server boots:

- Required tables are created in MySQL.
- Demo template + pages are created if they don't already exist.
- The REST API exposes `/api/landing-pages` and `/api/landing-pages/resolve/:domain/:slug`.

## Production notes

- Use MySQL 8+ with connection pooling settings defined via `DATABASE_POOL_MIN/MAX`.
- Generate a Strapi API Token (`Settings → API Tokens`) and paste it into `frontend/.env.local` as `STRAPI_API_TOKEN`.
- Lock down the public role so only the `landing-pages` endpoints you need are exposed; or proxy through Next.js `route handlers`.
- Run `npm run build` before `npm run start` when deploying in production environments.

For detailed Strapi docs, see https://docs.strapi.io.
