import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequest } from '@/core/errors/bad-request'

import { ProductPresenter } from '../../presenters/product'
import { makeCreateProduct } from './factories/make-create-product'

export async function createProduct(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/products',
    {
      schema: {
        summary: 'Create Product',
        tags: ['Product'],
        body: z.object({
          name: z.string(),
          description: z.string().nullish(),
          imageUrl: z.string().nullish(),
          price: z.number(),
        }),
        response: {
          201: z.object({
            id: z.string(),
            name: z.string(),
            description: z.string().nullish(),
            imageUrl: z.string().nullish(),
            price: z.number(),
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
      const { name, description, imageUrl, price } = request.body

      const result = await makeCreateProduct().execute({
        name,
        description: description ?? null,
        imageUrl: imageUrl ?? null,
        price,
      })

      if (result.hasFailed()) {
        const { reason } = result

        if (reason instanceof BadRequest) {
          throw new BadRequest(reason.message)
        }

        throw new Error(reason)
      }

      return reply.status(201).send(ProductPresenter.toHttpResponse(result.result.product))
    },
  )
}
