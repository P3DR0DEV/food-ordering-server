import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { ProductPresenter } from '../../presenters/product'
import { makeGetAllProducts } from './factories/make-get-all-products'

export async function getAllProducts(app: FastifyInstance) {
  app.get(
    '/products',
    {
      schema: {
        summary: 'Get All Products',
        tags: ['Product'],
        response: {
          200: z.object({
            products: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                description: z.string().nullish(),
                imageUrl: z.string().nullish(),
                price: z.number(),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await makeGetAllProducts().execute()

      if (result.hasFailed()) {
        throw new Error()
      }

      const { products } = result.result

      return reply.status(200).send({ products: products.map(ProductPresenter.toHttpResponse) })
    },
  )
}
