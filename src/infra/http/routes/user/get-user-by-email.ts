import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { NotFound } from '@/core/errors/not-found'

import { UserPresenter } from '../../presenters/user'
import { getUserByEmailUseCase } from './factories/make-get-user-by-email'

export async function getUserByEmailRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users/:email/mail',
    {
      schema: {
        summary: 'Get User By Email',
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
              role: z.enum(['admin', 'user']),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email } = request.params
      const result = await getUserByEmailUseCase.execute(email)

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
