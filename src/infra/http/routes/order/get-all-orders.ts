import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { OrderPresenter } from '../../presenters/order'
import { getAllOrdersUseCase } from './factories/make-get-all-orders'

export async function getAllOrders(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/orders',
    {
      schema: {
        summary: 'Get all orders',
        tags: ['Order'],
        querystring: z.object({
          status: z.enum(['new', 'preparing', 'delivering', 'delivered', 'cancelled']).optional(),
        }),
        response: {
          200: z.object({
            orders: z.array(
              z.object({
                id: z.string().uuid(),
                status: z.string(),
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

      const result = await getAllOrdersUseCase.execute(status)

      if (!result.hasSucceeded()) {
        throw new Error()
      }

      const { orders } = result.result

      return reply.status(200).send({ orders: orders.map(OrderPresenter.toHttpResponse) })
    },
  )
}
