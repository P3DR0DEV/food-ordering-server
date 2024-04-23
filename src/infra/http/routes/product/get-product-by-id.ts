import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequest } from '@/core/errors/bad-request'
import { NotFound } from '@/core/errors/not-found'

import { ProductPresenter } from '../../presenters/product'
import { getProductByIdUseCase } from './factories/make-get-product-by-id'

export async function getProductById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/products/:id',
    {
      schema: {
        summary: 'Get Product By Id',
        tags: ['Product'],
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            product: z.object({
              id: z.string(),
              name: z.string(),
              description: z.string().nullish(),
              imageUrl: z.string().nullish(),
              price: z.number(),
            }),
          }),
          404: z.object({
            error: z.string(),
            message: z.string(),
            cause: z.number(),
            name: z.string(),
          }),
          400: z.object({
            error: z.string(),
            message: z.string(),
            cause: z.number(),
            name: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await getProductByIdUseCase.execute(id)

      if (!result.hasSucceeded()) {
        const { reason } = result

        if (reason instanceof NotFound) {
          throw new NotFound(reason.message)
        }

        if (reason instanceof BadRequest) {
          throw new BadRequest(reason.message)
        }

        throw new Error()
      }

      return reply.status(200).send({ product: ProductPresenter.toHttpResponse(result.result.product) })
    },
  )
}
