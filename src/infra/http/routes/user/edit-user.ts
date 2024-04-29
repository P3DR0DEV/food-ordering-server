import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { BadRequest } from '@/core/errors/bad-request'
import { NotFound } from '@/core/errors/not-found'

import { UserPresenter } from '../../presenters/user'
import { editUserUseCase } from './factories/make-edit-user'

export async function editUserRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/users/:id',
    {
      schema: {
        summary: 'Edit User',
        tags: ['User'],
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          role: z.enum(['admin', 'user']),
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
      const { id } = request.params
      const { name, email, role } = request.body
      const result = await editUserUseCase.execute({ id, name, email, role })

      if (!result.hasSucceeded()) {
        const { reason } = result
        if (reason instanceof BadRequest) {
          throw new BadRequest(reason.message)
        }

        if (reason instanceof NotFound) {
          throw new NotFound(reason.message)
        }

        throw new Error(reason)
      }

      return reply.status(200).send({ user: UserPresenter.toHttpResponse(result.result.user) })
    },
  )
}
