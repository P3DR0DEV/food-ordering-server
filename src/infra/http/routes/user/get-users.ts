import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { UserPresenter } from '../../presenters/user'
import { verifyJwt } from '../auth/verify-jwt'
import { getUsersUseCase } from './factories/make-get-users'

//! 'http://localhost:3333/users?role=ADMIN'
export async function getUsersRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users',
    {
      onRequest: [async (request, reply) => await verifyJwt(request, reply)],
      schema: {
        summary: 'Get all Users',
        tags: ['User'],
        querystring: z.object({
          role: z.enum(['admin', 'user']).optional(),
        }),
        headers: z.object({
          authorization: z.string(),
        }),
        response: {
          200: z.object({
            users: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                email: z.string(),
                role: z.enum(['admin', 'user']),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { role } = request.query

      const result = await getUsersUseCase.execute(role)

      if (!result.hasSucceeded()) {
        throw new Error()
      }

      const { users } = result.result

      const usersPresented = users.map((user) => UserPresenter.toHttpResponse(user))

      return reply.status(201).send({ users: usersPresented })
    },
  )
}
