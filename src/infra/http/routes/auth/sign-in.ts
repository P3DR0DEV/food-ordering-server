import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequest } from '@/core/errors/bad-request'
import { NotFound } from '@/core/errors/not-found'
import { HashPassword } from '@/domain/food-ordering/enterprise/entities/value-object/hash-password'

import { getUserByEmailUseCase } from '../user/factories/make-get-user-by-email'

export async function signIn(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sign-in',
    {
      schema: {
        summary: 'Sign In',
        tags: ['Auth'],
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
        response: {
          200: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const result = await getUserByEmailUseCase.execute(email)

      if (!result.hasSucceeded()) {
        const { reason } = result

        if (reason instanceof NotFound) {
          throw new NotFound(reason.message)
        }
        throw new Error(reason)
      }

      const { user } = result.result

      const isPasswordValid = await HashPassword.compare(password, user.password)

      if (!isPasswordValid) {
        throw new BadRequest('Invalid password')
      }

      const token = app.jwt.sign({
        id: user.id.toString(),
        isAdmin: user.role === 'admin',
        email: user.email,
      })
      return reply.status(200).send({ token })
    },
  )
}
