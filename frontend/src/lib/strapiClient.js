import qs from 'qs';
import { LANDING_PAGE_REVALIDATE, STRAPI_API_TOKEN, STRAPI_URL } from './config';

const headers = () => {
  const h = { 'Content-Type': 'application/json' };
  if (STRAPI_API_TOKEN) {
    h.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  }
  return h;
};

export function buildStrapiUrl(path, query) {
  const queryString = query ? `?${qs.stringify(query, { encodeValuesOnly: true })}` : '';
  return `${STRAPI_URL.replace(/\/$/, '')}/api${path}${queryString}`;
}

export async function fetchFromStrapi(path, query, fetchOptions = {}) {
  const url = buildStrapiUrl(path, query);
  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      ...headers(),
      ...(fetchOptions.headers ?? {})
    },
    next: {
      revalidate: LANDING_PAGE_REVALIDATE,
      ...(fetchOptions.next ?? {})
    }
  });

  if (!response.ok) {
    const error = await safeJson(response);
    throw new Error(`Strapi request failed (${response.status}): ${JSON.stringify(error)}`);
  }

  return response.json();
}

async function safeJson(response) {
  try {
    return await response.json();
  } catch {
    return { message: response.statusText };
  }
}
