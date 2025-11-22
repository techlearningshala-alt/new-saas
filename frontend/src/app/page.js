import LandingPageView from '@/components/LandingPageView';
import { getLandingPage } from '@/lib/landingPages';
import { getRequestHost } from '@/lib/request';

export async function generateMetadata() {
  const host = getRequestHost();
  const page = await getLandingPage({ host, pathSegments: [] });

  return {
    title: page?.seo?.metaTitle ?? page?.title ?? 'SaaS Landing Platform',
    description:
      page?.seo?.metaDescription ??
      'Multi-tenant landing pages powered by Strapi and Next.js'
  };
}

export default async function Home() {
  const host = getRequestHost();
  const page = await getLandingPage({ host, pathSegments: [] });

  return <LandingPageView page={page} />;
}
