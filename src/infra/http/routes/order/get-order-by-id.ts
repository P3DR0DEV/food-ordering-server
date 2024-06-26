import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { BadRequest } from '@/core/errors/bad-request'
import { NotFound } from '@/core/errors/not-found'

import { OrderPresenter } from '../../presenters/order'
import { Unauthorized } from '../_errors/unauthorized'
import { auth } from '../auth/verify-jwt'
import { getOrderByIdUseCase } from './factories/make-get-order-by-id'

export async function getOrderById(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/orders/:orderId',
      {
        schema: {
          summary: 'Get order by id',
          tags: ['Order'],
          params: z.object({
            orderId: z.string().uuid(),
          }),
          headers: z.object({
            authorization: z.string(),
          }),
          response: {
            200: z.object({
              order: z.object({
                id: z.string().uuid(),
                total: z.number(),
                status: z.string().optional(),
                userId: z.string().uuid(),
                createdAt: z.string(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { isAdmin, id } = request.user
        const { orderId } = request.params

        const result = await getOrderByIdUseCase.execute(orderId)

        if (!result.hasSucceeded()) {
          const { reason } = result

          if (reason instanceof BadRequest) {
            throw new BadRequest(reason.message)
          }

          if (reason instanceof NotFound) {
            throw new NotFound(reason.message)
          }
          throw new Error(reason)
        }

        const { order } = result.result

        if (order.userId !== id && !isAdmin) {
          throw new Unauthorized('Unauthorized')
        }

        return reply.code(200).send({ order: OrderPresenter.toHttpResponse(order) })
      },
    )
}
