import { Either, failure, success } from '@/core/either'
import { BadRequest } from '@/core/errors/bad-request'
import { NotFound } from '@/core/errors/not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { Order } from '@/domain/food-ordering/enterprise/entities/order'

import { OrderRepository } from '../../repositories/order-repository'

type GetOrderByIdUseCaseResponse = Either<BadRequest | NotFound, { order: Order }>

export class GetOrderByIdUseCase implements UseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(id: string): Promise<GetOrderByIdUseCaseResponse> {
    if (!id) {
      return failure(new BadRequest('Id is required'))
    }
    const order = await this.orderRepository.findById(id)

    if (!order) {
      return failure(new NotFound('Order not found'))
    }

    return success({ order })
  }
}
