import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { OrderPresenter } from '../../presenters/order'
import { createOrderUseCase } from './factories/make-create-order'

export async function createOrder(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/orders',
    {
      schema: {
        summary: 'Create an order',
        tags: ['Order'],
        body: z.object({
          userId: z.string(),
          total: z.number(),
          status: z.enum(['NEW', 'PREPARING', 'DELIVERING', 'DELIVERED', 'CANCELLED']).optional(),
        }),
        response: {
          201: z.object({
            order: z.object({
              id: z.string(),
              total: z.number(),
              status: z.string().optional(),
              userId: z.string(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { userId, total, status } = request.body

      const result = await createOrderUseCase.execute({
        userId,
        total,
        status,
      })

      if (!result.hasSucceeded()) {
        throw new Error()
      }

      const { order } = result.result

      return reply.status(201).send({ order: OrderPresenter.toHttpResponse(order) })
    },
  )
}
