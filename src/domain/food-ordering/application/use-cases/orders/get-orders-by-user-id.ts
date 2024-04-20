import { Either, failure, success } from '@/core/either'
import { BadRequest } from '@/core/errors/bad-request'
import { UseCase } from '@/core/use-cases/use-case'
import { Order } from '@/domain/food-ordering/enterprise/entities/order'

import { OrderRepository } from '../../repositories/order-repository'

type GetOrdersByUserIdUseCaseResponse = Either<BadRequest, { orders: Order[] }>

export class GetOrdersByUserIdUseCase implements UseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(userId: string): Promise<GetOrdersByUserIdUseCaseResponse> {
    if (!userId) {
      return failure(new BadRequest('User id is required'))
    }

    const orders = await this.orderRepository.findManyByUserId(userId)

    return success({ orders })
  }
}
