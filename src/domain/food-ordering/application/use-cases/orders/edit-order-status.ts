import { Either, failure, success } from '@/core/either'
import { BadRequest } from '@/core/errors/bad-request'
import { NotFound } from '@/core/errors/not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { Order } from '@/domain/food-ordering/enterprise/entities/order'

import { OrderRepository } from '../../repositories/order-repository'

type EditOrderStatusUseCaseResponse = Either<BadRequest, { order: Order }>

export class EditOrderStatusUseCase implements UseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(
    orderId: string,
    status: 'preparing' | 'delivering' | 'delivered' | 'cancelled',
  ): Promise<EditOrderStatusUseCaseResponse> {
    if (!status) {
      return failure(new BadRequest('Status is required'))
    }

    if (['preparing', 'delivering', 'delivered', 'cancelled'].indexOf(status) === -1) {
      return failure(new BadRequest('Invalid status'))
    }

    const order = await this.orderRepository.updateStatus(orderId, status)

    if (!order) {
      return failure(new NotFound('Order not found'))
    }

    return success({ order })
  }
}
