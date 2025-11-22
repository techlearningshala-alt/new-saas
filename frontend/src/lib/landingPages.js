import { cache } from 'react';
import { DEFAULT_DOMAIN } from './config';
import { buildFallbackLandingPage } from './fallback';
import { normalizeLandingPageResponse } from './normalizers';
import { fetchFromStrapi } from './strapiClient';

function sanitizeHost(host) {
  if (!host) return DEFAULT_DOMAIN;
  return host.replace(/:\d+$/, '').toLowerCase();
}

function normalizePath(pathSegments) {
  if (!pathSegments || pathSegments.length === 0) return '/';
  const path = Array.isArray(pathSegments) ? pathSegments.join('/') : pathSegments;
  return `/${path}`.replace(/\/+/g, '/');
}

async function fetchPage({ host, path }) {
  const query = {
    filters: {
      domain: {
        $eq: host
      },
      path: {
        $eq: path
      }
    },
    populate: {
      sections: {
        populate: '*'
      },
      theme: '*',
      seo: '*',
      template: {
        populate: {
          sections: {
            populate: '*'
          },
          defaultTheme: '*',
          seo: '*'
        }
      }
    },
    publicationState: 'live',
    pagination: { pageSize: 1 }
  };

  try {
    const payload = await fetchFromStrapi('/landing-pages', query);
    const normalized = normalizeLandingPageResponse(payload);
    if (normalized) {
      return {
        ...normalized,
        source: 'strapi'
      };
    }
  } catch (error) {
    console.error('[landingPages] Failed to fetch from Strapi', error);
  }

  return {
    ...buildFallbackLandingPage({ host, path }),
    source: 'fallback'
  };
}

export const getLandingPage = cache(async ({ host, pathSegments }) => {
  const sanitizedHost = sanitizeHost(host);
  const normalizedPath = normalizePath(pathSegments);

  return fetchPage({ host: sanitizedHost, path: normalizedPath });
});
