import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { NotFound } from '@/core/errors/not-found'

import { ProductPresenter } from '../../presenters/product'
import { editProductUseCase } from './factories/make-edit-product'

export async function editProduct(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/products/:productId',
    {
      schema: {
        summary: 'Edit Product',
        tags: ['Product'],
        params: z.object({
          productId: z.string(),
        }),
        body: z.object({
          name: z.string(),
          description: z.string(),
          price: z.number(),
          imageUrl: z.string(),
        }),
        response: {
          200: z.object({
            product: z.object({
              id: z.string(),
              name: z.string(),
              description: z.string().nullable(),
              price: z.number(),
              imageUrl: z.string().nullable(),
            }),
          }),
          404: z.object({
            name: z.string(),
            message: z.string(),
            cause: z.string().optional(),
            errors: z.record(z.any()).optional(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { productId } = request.params
      const { name, description, price, imageUrl } = request.body

      const result = await editProductUseCase.execute({
        id: productId,
        name,
        description,
        price,
        imageUrl,
      })

      if (!result.hasSucceeded()) {
        const { reason } = result
        if (reason instanceof NotFound) {
          throw new NotFound(reason.message)
        }

        throw new Error(reason.message)
      }

      const { product } = result.result

      return reply.code(200).send({
        product: ProductPresenter.toHttpResponse(product),
      })
    },
  )
}
