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
          status: z.enum(['new', 'preparing', 'delivering', 'delivered', 'cancelled']).optional(),
          orderItems: z.array(
            z.object({
              productId: z.string().uuid(),
              quantity: z.number(),
              size: z.enum(['S', 'M', 'L', 'XL', 'XXL']),
            }),
          ),
        }),
        response: {
          201: z.object({
            order: z.object({
              id: z.string(),
              total: z.number(),
              status: z.string().optional(),
              userId: z.string(),
              createdAt: z.string(),
              orderItems: z.array(
                z.object({
                  productId: z.string().uuid(),
                  quantity: z.number(),
                  size: z.enum(['S', 'M', 'L', 'XL', 'XXL']),
                  orderId: z.string().uuid(),
                }),
              ),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { userId, total, status, orderItems } = request.body

      const result = await createOrderUseCase.execute({
        userId,
        total,
        status,
        orderItems,
      })

      if (!result.hasSucceeded()) {
        throw new Error()
      }

      const { order } = result.result

      return reply.status(201).send({ order: OrderPresenter.toHttpResponse(order) })
    },
  )
}
