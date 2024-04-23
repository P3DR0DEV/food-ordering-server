import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { OrderPresenter } from '../../presenters/order'
import { getAllOrdersUseCase } from './factories/make-get-all-orders'
import { getOrdersByStatusUseCase } from './factories/make-get-orders-by-status'

export async function getAllOrders(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/orders',
    {
      schema: {
        querystring: z.object({
          status: z.enum(['NEW', 'PREPARING', 'DELIVERING', 'DELIVERED', 'CANCELLED']),
        }),
        response: {
          200: z.object({
            orders: z.array(
              z.object({
                id: z.string().uuid(),
                status: z.enum(['NEW', 'PREPARING', 'DELIVERING', 'DELIVERED', 'CANCELLED']),
                total: z.number(),
                userId: z.string().uuid(),
                createdAt: z.string(),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { status } = request.query

      const result = status ? await getOrdersByStatusUseCase.execute(status) : await getAllOrdersUseCase.execute()

      if (!result.hasSucceeded()) {
        throw new Error()
      }

      const { orders } = result.result

      return reply.status(200).send({ orders: orders.map(OrderPresenter.toHttpResponse) })
    },
  )
}
