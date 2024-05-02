import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { BadRequest } from '@/core/errors/bad-request'
import { NotFound } from '@/core/errors/not-found'

import { UserPresenter } from '../../presenters/user'
import { Unauthorized } from '../_errors/unauthorized'
import { auth } from '../auth/verify-jwt'
import { editUserUseCase } from './factories/make-edit-user'

export async function editUserRoute(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/users/:id',
      {
        schema: {
          summary: 'Edit User',
          tags: ['User'],
          params: z.object({
            id: z.string(),
          }),
          headers: z.object({
            authorization: z.string(),
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

        const { isAdmin, id: userId } = request.user

        if (id !== userId && !isAdmin) {
          throw new Unauthorized('Invalid Operation')
        }

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
