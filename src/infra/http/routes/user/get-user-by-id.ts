import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { BadRequest } from '@/core/errors/bad-request'
import { NotFound } from '@/core/errors/not-found'

import { UserPresenter } from '../../presenters/user'
import { makeGetUsersById } from './factories/make-get-user-by-id'

export async function getUserByIdRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users/:id',
    {
      schema: {
        summary: 'Get User By Id',
        tags: ['User'],
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            user: z.object({
              id: z.string(),
              name: z.string(),
              email: z.string(),
              role: z.enum(['ADMIN', 'USER']),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params
      const result = await makeGetUsersById().execute(id)

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

      return reply.status(200).send({ user: UserPresenter.toHttpResponse(result.result.user) })
    },
  )
}
