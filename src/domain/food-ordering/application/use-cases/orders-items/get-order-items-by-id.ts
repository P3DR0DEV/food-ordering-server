import { Either, failure, success } from '@/core/either'
import { BadRequest } from '@/core/errors/bad-request'
import { NotFound } from '@/core/errors/not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { OrderItems } from '@/domain/food-ordering/enterprise/entities/order-items'

import { OrderItemsRepository } from '../../repositories/order-items-repository'

type GetOrderItemsByIdUseCaseResponse = Either<BadRequest | NotFound, { orderItems: OrderItems }>

export class GetOrderItemsByIdUseCase implements UseCase {
  constructor(private readonly orderItemsRepository: OrderItemsRepository) {}

  async execute(id: string): Promise<GetOrderItemsByIdUseCaseResponse> {
    if (!id) {
      return failure(new BadRequest('Invalid id'))
    }

    const orderItems = await this.orderItemsRepository.findById(id)

    if (!orderItems) {
      return failure(new NotFound('Order items not found'))
    }

    return success({ orderItems })
  }
}
