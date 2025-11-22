export const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';
export const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN ?? '';
export const DEFAULT_DOMAIN = process.env.DEFAULT_DOMAIN ?? 'localhost';
export const LANDING_PAGE_REVALIDATE = Number(
  process.env.LANDING_PAGE_REVALIDATE ?? 60
);
export const FALLBACK_TEMPLATE_NAME = 'default-template';
