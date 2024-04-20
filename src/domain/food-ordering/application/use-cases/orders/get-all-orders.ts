import { Either, success } from '@/core/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Order } from '@/domain/food-ordering/enterprise/entities/order'

import { OrderRepository } from '../../repositories/order-repository'

type GetAllOrdersUseCaseResponse = Either<unknown, { orders: Order[] }>

export class GetAllOrdersUseCase implements UseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<GetAllOrdersUseCaseResponse> {
    const orders = await this.orderRepository.findMany()

    return success({ orders })
  }
}
