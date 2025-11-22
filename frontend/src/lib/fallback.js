const sharedSections = [
  {
    __component: 'sections.hero',
    eyebrow: 'Launch campaigns faster',
    headline: 'One Next.js codebase, unlimited landing pages',
    description:
      'Compose hero, feature, testimonial and CTA sections from reusable templates powered by Strapi.',
    primaryCtaLabel: 'Book a demo',
    primaryCtaUrl: 'https://cal.com',
    secondaryCtaLabel: 'See templates',
    secondaryCtaUrl: '#features',
    stats: [
      { title: 'Domains managed', stat: '120+' },
      { title: 'Avg. launch time', stat: '< 15 min' }
    ]
  },
  {
    __component: 'sections.feature-grid',
    heading: 'Everything ops teams need',
    description: 'Automate GTM tags, theming, and localization without touching code.',
    features: [
      {
        title: 'Domain-aware routing',
        description: 'Resolve content directly from the Host header, perfect for white-label SaaS.',
        icon: 'globe'
      },
      {
        title: 'Template system',
        description: 'Editors choose from curated layouts and reorder sections at will.',
        icon: 'layers'
      },
      {
        title: 'Realtime preview',
        description: 'Publish to 100+ landing pages with a single deploy.',
        icon: 'sparkles'
      }
    ]
  },
  {
    __component: 'sections.testimonials',
    heading: 'Trusted by distributed growth teams',
    items: [
      {
        quote:
          'We centralized 180 campaign pages without losing our brand consistency across domains.',
        authorName: 'Leah Patel',
        authorTitle: 'VP of Growth, Arcadia'
      },
      {
        quote: 'Engineering finally stopped shipping pixels. Strapi + Next.js unlocked the backlog.',
        authorName: 'Carlos Mendes',
        authorTitle: 'Head of Marketing Tech, Current'
      }
    ]
  },
  {
    __component: 'sections.cta-banner',
    heading: 'Ready to orchestrate 100+ landing pages from one codebase?',
    body: 'Spin up Strapi, connect your domains, and deploy your first template in minutes.',
    ctaLabel: 'Get started',
    ctaUrl: 'https://github.com'
  }
];

const fallbackTheme = {
  primary: '#2563eb',
  secondary: '#0f172a',
  accent: '#f97316',
  background: '#0f172a',
  muted: '#1e293b',
  text: '#f8fafc'
};

export function buildFallbackLandingPage({ host, path }) {
  return {
    id: 0,
    title: `Preview landing page for ${host}`,
    domain: host,
    path,
    gtmContainerId: 'GTM-XXXXXXX',
    status: 'preview',
    theme: fallbackTheme,
    sections: sharedSections,
    seo: {
      metaTitle: 'SaaS Landing Platform',
      metaDescription: 'Example landing page rendered without Strapi connectivity.'
    },
    isFallback: true
  };
}
