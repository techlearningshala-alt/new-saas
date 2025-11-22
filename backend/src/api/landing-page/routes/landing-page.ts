/**
 * landing-page router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::landing-page.landing-page', {
  config: {
    findBySlug: {
      middlewares: [],
      policies: []
    }
  },
  routes: [
    {
      method: 'GET',
      path: '/landing-pages/resolve/:domain/:slug',
      handler: 'landing-page.findBySlug',
      config: {
        auth: false
      }
    }
  ]
});
