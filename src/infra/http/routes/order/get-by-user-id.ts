import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { BadRequest } from '@/core/errors/bad-request'

import { OrderPresenter } from '../../presenters/order'
import { getOrdersByUserIdUseCase } from './factories/make-get-by-user-id'

export async function getOrderByUserId(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/orders/user/:userId',
    {
      schema: {
        summary: 'Get orders by user id',
        tags: ['Order'],
        params: z.object({
          userId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            orders: z.array(
              z.object({
                id: z.string().uuid(),
                status: z.enum(['NEW', 'PREPARING', 'DELIVERING', 'DELIVERED', 'CANCELLED']),
                total: z.number(),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { userId } = request.params
      const result = await getOrdersByUserIdUseCase.execute(userId)

      if (result.hasFailed()) {
        const { reason } = result

        if (reason instanceof BadRequest) {
          throw new BadRequest(reason.message)
        }
        throw new Error(reason)
      }

      return reply.status(200).send({ orders: result.result.orders.map(OrderPresenter.toHttpResponse) })
    },
  )
}
