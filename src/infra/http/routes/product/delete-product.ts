import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { BadRequest } from '@/core/errors/bad-request'
import { NotFound } from '@/core/errors/not-found'

import { Unauthorized } from '../_errors/unauthorized'
import { auth } from '../auth/verify-jwt'
import { deleteProductUseCase } from './factories/make-delete-product'

export async function deleteProduct(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/products/:id',
      {
        schema: {
          summary: 'Delete Product',
          tags: ['Product'],
          params: z.object({
            id: z.string(),
          }),
          headers: z.object({
            authorization: z.string(),
          }),
          response: {
            200: z.object({
              message: z.string(),
            }),
            404: z.object({
              name: z.string(),
              message: z.string(),
              cause: z.string().optional(),
              errors: z.record(z.any()).optional(),
            }),
            400: z.object({
              name: z.string(),
              message: z.string(),
              cause: z.string().optional(),
              errors: z.record(z.any()).optional(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { isAdmin } = request.user

        if (!isAdmin) {
          throw new Unauthorized('Only admins can delete products')
        }

        const { id } = request.params

        const result = await deleteProductUseCase.execute(id)

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
        const { message } = result.result

        return reply.status(200).send({ message })
      },
    )
}
