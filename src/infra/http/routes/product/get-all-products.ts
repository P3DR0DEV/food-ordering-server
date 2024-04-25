import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { ProductPresenter } from '../../presenters/product'
import { verifyJwt } from '../auth/verify-jwt'
import { getAllProductsUseCase } from './factories/make-get-all-products'

export async function getAllProducts(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/products',
    {
      onRequest: [verifyJwt],
      schema: {
        summary: 'Get All Products',
        tags: ['Product'],
        headers: z.object({
          authorization: z.string(),
        }),
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
      const result = await getAllProductsUseCase.execute()

      if (result.hasFailed()) {
        throw new Error()
      }

      const { products } = result.result

      return reply.status(200).send({ products: products.map(ProductPresenter.toHttpResponse) })
    },
  )
}
