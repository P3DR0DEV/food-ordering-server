import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { BadRequest } from '@/core/errors/bad-request'

import { UserPresenter } from '../../presenters/user'
import { registerUserUseCase } from './factories/make-create-user'

export async function createUserRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        summary: 'Create a User',
        tags: ['User'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string(),
          role: z.enum(['ADMIN', 'USER']).default('USER'),
        }),
        response: {
          201: z.object({
            user: z.object({
              id: z.string(),
              name: z.string(),
              email: z.string(),
              role: z.enum(['ADMIN', 'USER']),
            }),
          }),
          400: z.object({
            name: z.string(),
            message: z.string(),
            cause: z.string().optional(),
            errors: z.record(z.any()).optional(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email, password, role } = request.body

      const result = await registerUserUseCase.execute({ name, email, password, role })

      if (result.hasFailed()) {
        throw new BadRequest(result.reason.message)
      }

      return reply.status(201).send({
        user: UserPresenter.toHttpResponse(result.result.user),
      })
    },
  )
}
