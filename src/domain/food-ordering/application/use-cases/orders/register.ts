import { Either, success } from '@/core/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Order } from '@/domain/food-ordering/enterprise/entities/order'

import { OrderRepository } from '../../repositories/order-repository'

type RegisterOrderUseCaseRequest = {
  userId: string
  total: number
  status?: 'NEW' | 'PREPARING' | 'DELIVERING' | 'DELIVERED' | 'CANCELLED'
  createdAt: Date
  updatedAt?: Date | null
}

type RegisterOrderUseCaseResponse = Either<unknown, { order: Order }>

export class RegisterOrderUseCase implements UseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(props: RegisterOrderUseCaseRequest): Promise<RegisterOrderUseCaseResponse> {
    const order = Order.create({
      userId: props.userId,
      total: props.total,
      status: props.status ?? 'NEW',
    })

    await this.orderRepository.create(order)

    return success({ order })
  }
}
