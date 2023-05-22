/**
 * home-page controller
 */

import { factories } from '@strapi/strapi'

// export default factories.createCoreController('api::home-page.home-page')

export default factories.createCoreController(
  'api::home-page.home-page',
  ({ strapi }) => ({
    async find(ctx) {
      const { query } = ctx

      const entity = await strapi.entityService.findMany(
        'api::home-page.home-page',
        {
          ...query,
          populate: {
            featuredTitle: true,
            featuredDescription: true,
            SEO: {
              populate: {
                pageTitle: true,
                pageDescription: true,
                pageImage: {
                  populate: {
                    localFile: {
                      populate: {
                        url: true,
                      },
                    },
                  },
                },
              },
            },
          },
        }
      )
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx)

      return this.transformResponse(sanitizedEntity)
    },
  })
)
