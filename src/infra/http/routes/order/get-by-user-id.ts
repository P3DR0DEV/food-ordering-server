import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { BadRequest } from '@/core/errors/bad-request'

import { OrderPresenter } from '../../presenters/order'
import { auth } from '../auth/verify-jwt'
import { getOrdersByUserIdUseCase } from './factories/make-get-by-user-id'

export async function getOrderByUserId(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/orders/user',
      {
        schema: {
          summary: 'Get orders by user id',
          tags: ['Order'],
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
                }),
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const { id } = request.user

        if (!id) {
          throw new BadRequest('User id not found')
        }

        const result = await getOrdersByUserIdUseCase.execute(id)

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
