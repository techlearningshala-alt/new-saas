/**
 * landing-page controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::landing-page.landing-page',
  ({ strapi }) => ({
    async find(ctx) {
      // Allow filtering by host header without exposing custom route.
      const { domain } = ctx.request.query as { domain?: string };
      if (domain) {
        ctx.query = ctx.query || {};
        ctx.query.filters = ctx.query.filters || {};
        ctx.query.filters.domain = domain;
      }

      const response = await super.find(ctx);
      return response;
    },

    async findBySlug(ctx) {
      const { slug, domain } = ctx.params;
      const page = await strapi.entityService.findMany(
        'api::landing-page.landing-page',
        {
          filters: {
            slug,
            domain
          },
          populate: [
            'sections',
            'sections.stats',
            'sections.features',
            'sections.items',
            'seo',
            'theme',
            'template',
            'template.sections'
          ],
          limit: 1
        }
      );

      if (!page || !page.length) {
        return ctx.notFound('Landing page not found for the provided domain/slug.');
      }

      return page[0];
    }
  })
);
