import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { NotFound } from '@/core/errors/not-found'

import { UserPresenter } from '../../presenters/user'
import { makeGetUserByEmail } from './factories/make-get-user-by-email'

export async function getUserByIdRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users/:email/mail',
    {
      schema: {
        summary: 'Get User By Id',
        tags: ['User'],
        params: z.object({
          email: z.string().email(),
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
      const { email } = request.params
      const result = await makeGetUserByEmail().execute(email)

      if (!result.hasSucceeded()) {
        const { reason } = result

        if (reason instanceof NotFound) {
          throw new NotFound(reason.message)
        }

        throw new Error(reason)
      }

      const { user } = result.result

      return reply.status(201).send({ user: UserPresenter.toHttpResponse(user) })
    },
  )
}
