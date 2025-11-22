import type { Core } from '@strapi/strapi';

const DEFAULT_TEMPLATE_SLUG = 'default-template';

const baseSections = [
  {
    __component: 'sections.hero',
    eyebrow: 'Multi-domain landing platform',
    headline: 'Launch 100+ localized landing pages from a single template',
    description:
      'Combine Strapi collections with a Next.js front end that resolves content from each request domain.',
    primaryCtaLabel: 'Book a demo',
    primaryCtaUrl: 'https://cal.com',
    secondaryCtaLabel: 'Browse templates',
    secondaryCtaUrl: '#features',
    stats: [
      {
        title: 'Domains managed',
        stat: '120+'
      },
      {
        title: 'Markets launched',
        stat: '26'
      },
      {
        title: 'Avg. launch time',
        stat: '<15 min'
      }
    ]
  },
  {
    __component: 'sections.feature-grid',
    heading: 'Drive campaigns without code freezes',
    description:
      'Editors pick a template, add domain-specific GTM IDs, and publish instantly.',
    features: [
      {
        title: 'Domain aware routing',
        description: 'The Next.js app resolves landing pages using the Host header.',
        icon: 'globe'
      },
      {
        title: 'Template overrides',
        description: 'Mix and match hero, feature, testimonial, and CTA sections.',
        icon: 'layout'
      },
      {
        title: 'GTM automation',
        description: 'Assign distinct GTM containers per domain without redeploys.',
        icon: 'cursor-arrow-rays'
      }
    ]
  },
  {
    __component: 'sections.testimonials',
    heading: 'Proven with fast-moving GTM teams',
    items: [
      {
        quote:
          'We migrated 180 acquisition pages with no downtime. Growth ships daily again.',
        authorName: 'Leah Patel',
        authorTitle: 'VP of Growth, Arcadia Cloud'
      },
      {
        quote: 'Our agencies now manage their own domains safely. Engineering sleeps again.',
        authorName: 'Mateo Alvarez',
        authorTitle: 'Head of Marketing Tech, Yara'
      }
    ]
  },
  {
    __component: 'sections.cta-banner',
    heading: 'Ready to orchestrate campaigns at scale?',
    body: 'Clone this repo, connect Strapi to MySQL, and plug in your domains.',
    ctaLabel: 'Get started',
    ctaUrl: 'https://github.com'
  }
];

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      const template = await ensureDefaultTemplate(strapi);
      await ensureDemoPages(strapi, template.id);
    } catch (error) {
      strapi.log.warn(`Failed to seed demo landing data: ${(error as Error).message}`);
    }
  }
};

async function ensureDefaultTemplate(strapi: Core.Strapi) {
  const existing = await strapi.entityService.findMany(
    'api::landing-template.landing-template',
    {
      filters: { slug: DEFAULT_TEMPLATE_SLUG },
      limit: 1
    }
  );

  if (existing.length) {
    return existing[0];
  }

  strapi.log.info('Seeding default landing template');

  return strapi.entityService.create('api::landing-template.landing-template', {
    data: {
      name: 'Default SaaS Template',
      slug: DEFAULT_TEMPLATE_SLUG,
      description: 'Hero + feature grid + testimonials + CTA',
      sections: cloneSections(),
      defaultTheme: {
        primary: '#2563eb',
        secondary: '#0f172a',
        accent: '#f97316',
        background: '#020617',
        muted: '#0f172a',
        text: '#f8fafc'
      },
      seo: {
        metaTitle: 'Default SaaS Template',
        metaDescription: 'Kickstart 100+ landing pages from one template'
      },
      publishedAt: new Date()
    }
  });
}

async function ensureDemoPages(strapi: Core.Strapi, templateId: number) {
  const demoPages = [
    {
      title: 'Demo Landing',
      domain: 'demo.localhost',
      path: '/',
      gtmContainerId: 'GTM-DEMO123'
    },
    {
      title: 'Campaign Microsite',
      domain: 'campaign.localhost',
      path: '/summer',
      gtmContainerId: 'GTM-SUMMER456'
    }
  ];

  for (const page of demoPages) {
    const existing = await strapi.entityService.findMany('api::landing-page.landing-page', {
      filters: { domain: page.domain, path: page.path },
      limit: 1
    });

    if (existing.length) {
      continue;
    }

    strapi.log.info(`Seeding landing page for ${page.domain}${page.path}`);

    await strapi.entityService.create('api::landing-page.landing-page', {
      data: {
        ...page,
        sections: cloneSections(),
        theme: {
          primary: '#4f46e5',
          secondary: '#0f172a',
          accent: '#a855f7',
          background: '#020617',
          muted: '#1e1b4b',
          text: '#f8fafc'
        },
        template: templateId,
        seo: {
          metaTitle: page.title,
          metaDescription: 'Demo landing page seeded during bootstrap'
        },
        status: 'live',
        publishedAt: new Date()
      }
    });
  }
}

function cloneSections() {
  return JSON.parse(JSON.stringify(baseSections));
}
