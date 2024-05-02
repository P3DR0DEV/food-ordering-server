import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequest } from '@/core/errors/bad-request'

import { ProductPresenter } from '../../presenters/product'
import { Unauthorized } from '../_errors/unauthorized'
import { auth } from '../auth/verify-jwt'
import { registerProductUseCase } from './factories/make-create-product'

export async function createProduct(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
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
          headers: z.object({
            authorization: z.string(),
          }),
          response: {
            201: z.object({
              product: z.object({
                id: z.string(),
                name: z.string(),
                description: z.string().nullish(),
                imageUrl: z.string().nullish(),
                price: z.number(),
              }),
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
        const { isAdmin } = request.user

        if (!isAdmin) {
          throw new Unauthorized('Only admins can create products')
        }

        const { name, description, imageUrl, price } = request.body

        const result = await registerProductUseCase.execute({
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

        return reply.status(201).send({ product: ProductPresenter.toHttpResponse(result.result.product) })
      },
    )
}
