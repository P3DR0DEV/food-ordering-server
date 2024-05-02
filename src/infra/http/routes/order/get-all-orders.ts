import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { OrderPresenter } from '../../presenters/order'
import { Unauthorized } from '../_errors/unauthorized'
import { auth } from '../auth/verify-jwt'
import { getAllOrdersUseCase } from './factories/make-get-all-orders'

export async function getAllOrders(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/orders',
      {
        schema: {
          summary: 'Get all orders',
          tags: ['Order'],
          querystring: z.object({
            status: z.enum(['new', 'preparing', 'delivering', 'delivered', 'cancelled']).optional(),
          }),
          headers: z.object({
            authorization: z.string(),
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
        const { isAdmin } = request.user

        if (!isAdmin) {
          throw new Unauthorized('Unauthorized')
        }

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
