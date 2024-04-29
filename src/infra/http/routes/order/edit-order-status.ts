import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { BadRequest } from '@/core/errors/bad-request'

import { OrderPresenter } from '../../presenters/order'
import { editOrderStatusUseCase } from './factories/make-edit-order-status'

export async function editOrderStatus(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/orders/:orderId/status',
    {
      schema: {
        summary: 'Edit order status',
        tags: ['Order'],
        params: z.object({
          orderId: z.string().uuid(),
        }),
        body: z.object({
          status: z.enum(['preparing', 'delivering', 'delivered', 'cancelled']),
        }),
        response: {
          200: z.object({
            order: z.object({
              id: z.string().uuid(),
              status: z.string(),
              total: z.number(),
              userId: z.string().uuid(),
              createdAt: z.string(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { orderId } = request.params
      const { status } = request.body

      const result = await editOrderStatusUseCase.execute(orderId, status)

      if (!result.hasSucceeded()) {
        const { reason } = result

        if (reason instanceof BadRequest) {
          throw new BadRequest(reason.message)
        }

        throw new Error(reason)
      }

      const { order } = result.result

      return reply.code(200).send({ order: OrderPresenter.toHttpResponse(order) })
    },
  )
}
