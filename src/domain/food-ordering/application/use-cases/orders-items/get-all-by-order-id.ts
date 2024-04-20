import { Either, failure, success } from '@/core/either'
import { BadRequest } from '@/core/errors/bad-request'
import { UseCase } from '@/core/use-cases/use-case'
import { OrderItems } from '@/domain/food-ordering/enterprise/entities/order-items'

import { OrderItemsRepository } from '../../repositories/order-items-repository'

type GetAllOrderItemsByOrderIdUseCaseResponse = Either<BadRequest, { orderItems: OrderItems[] }>

export class GetAllOrderItemsByOrderIdUseCase implements UseCase {
  constructor(private readonly orderItemsRepository: OrderItemsRepository) {}

  async execute(orderId: string): Promise<GetAllOrderItemsByOrderIdUseCaseResponse> {
    if (!orderId) {
      return failure(new BadRequest('Invalid id'))
    }
    const orderItems = await this.orderItemsRepository.findManyByOrderId(orderId)

    return success({ orderItems })
  }
}
