import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { BadRequest } from '@/core/errors/bad-request'

import { Unauthorized } from '../_errors/unauthorized'
import { auth } from '../auth/verify-jwt'
import { deleteUserUseCase } from './factories/make-delete-user'

export async function deleteUserRoute(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/users/:id',
      {
        schema: {
          summary: 'Delete User',
          tags: ['User'],
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
          },
        },
      },
      async (request, reply) => {
        const { id } = request.params
        const { isAdmin, id: userId } = request.user

        if (id !== userId && !isAdmin) {
          throw new Unauthorized('Invalid Operation')
        }

        const result = await deleteUserUseCase.execute(id)

        if (!result.hasSucceeded()) {
          const { reason } = result
          if (reason instanceof BadRequest) {
            throw new BadRequest(reason.message)
          }

          throw new Error(reason)
        }

        return reply.status(200).send({ message: result.result.message })
      },
    )
}
