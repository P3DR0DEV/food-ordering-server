import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { BadRequest } from '@/core/errors/bad-request'
import { User } from '@/domain/food-ordering/enterprise/entities/user'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { prisma } from '@/infra/lib/prisma'

import { CreateUserUseCaseAdapter } from './adapters/create-user-adapter'

const prismaRepository = new PrismaUsersRepository(prisma)
const createUser = new CreateUserUseCaseAdapter(prismaRepository)

export function CreateUser(app: FastifyInstance) {
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
          role: z.enum(['ADMIN', 'USER']),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password, role } = request.body

      const user = User.create({ name, email, password, role })

      const result = await createUser.execute(user)

      if (result.hasFailed()) {
        throw new BadRequest(result.reason.message)
      }

      return reply.status(201).send({ user: result.result.user })
    },
  )
}
