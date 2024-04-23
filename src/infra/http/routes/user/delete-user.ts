import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { BadRequest } from '@/core/errors/bad-request'

import { makeDeleteUser } from './factories/make-delete-user'

export async function deleteUserRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/users/:id',
    {
      schema: {
        summary: 'Delete User',
        tags: ['User'],
        params: z.object({
          id: z.string(),
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
      const result = await makeDeleteUser().execute(id)

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
