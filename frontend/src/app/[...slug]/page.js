import LandingPageView from '@/components/LandingPageView';
import { getLandingPage } from '@/lib/landingPages';
import { getRequestHost } from '@/lib/request';

export async function generateMetadata({ params }) {
  const host = getRequestHost();
  const page = await getLandingPage({ host, pathSegments: params?.slug });

  return {
    title: page?.seo?.metaTitle ?? page?.title ?? 'Landing page',
    description:
      page?.seo?.metaDescription ??
      'Composable landing page resolved from the current domain.'
  };
}

export default async function LandingPageRoute({ params }) {
  const host = getRequestHost();
  const page = await getLandingPage({ host, pathSegments: params?.slug });

  return <LandingPageView page={page} />;
}
