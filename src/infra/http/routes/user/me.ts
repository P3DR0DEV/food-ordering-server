import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '../auth/verify-jwt'

export async function meRoute(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/me',
      {
        schema: {
          summary: 'Get Me',
          tags: ['User'],
          headers: z.object({
            authorization: z.string(),
          }),
          response: {
            200: z.object({
              user: z.object({
                id: z.string(),
                name: z.string(),
                role: z.enum(['admin', 'user']),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { isAdmin, id: userId, name } = request.user

        return reply.status(200).send({
          user: { id: userId, name, role: isAdmin ? 'admin' : 'user' },
        })
      },
    )
}
