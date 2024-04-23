import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { UserPresenter } from '../../presenters/user'
import { makeGetUsers } from './factories/make-get-users'
import { makeGetUsersByRole } from './factories/make-get-users-by-role'

//! 'http://localhost:3333/users?role=ADMIN'
export async function getUsersRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users',
    {
      schema: {
        summary: 'Get all Users',
        tags: ['User'],
        querystring: z.object({
          role: z.enum(['ADMIN', 'USER']).optional(),
        }),
        response: {
          200: z.object({
            users: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                email: z.string(),
                role: z.enum(['ADMIN', 'USER']),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { role } = request.query
      let result

      role ? (result = await makeGetUsersByRole().execute(role)) : (result = await makeGetUsers().execute())

      if (!result.hasSucceeded()) {
        throw new Error(result.reason as string)
      }

      const { users } = result.result

      const usersPresented = users.map((user) => UserPresenter.toHttpResponse(user))

      return reply.status(201).send({ users: usersPresented })
    },
  )
}
