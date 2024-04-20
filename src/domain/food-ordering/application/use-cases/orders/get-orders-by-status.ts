import { Either, failure, success } from '@/core/either'
import { BadRequest } from '@/core/errors/bad-request'
import { UseCase } from '@/core/use-cases/use-case'
import { Order } from '@/domain/food-ordering/enterprise/entities/order'

import { OrderRepository } from '../../repositories/order-repository'

type GetOrdersByStatusUseCaseResponse = Either<BadRequest, { orders: Order[] }>

export class GetOrdersByStatusUseCase implements UseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(
    status: 'New' | 'Preparing' | 'Delivering' | 'Delivered' | 'Cancelled',
  ): Promise<GetOrdersByStatusUseCaseResponse> {
    if (!status) {
      return failure(new BadRequest('Status is required'))
    }

    if (['New', 'Preparing', 'Delivering', 'Delivered', 'Cancelled'].indexOf(status) === -1) {
      return failure(new BadRequest('Invalid status'))
    }

    const orders = await this.orderRepository.findManyByStatus(status)

    return success({ orders })
  }
}
