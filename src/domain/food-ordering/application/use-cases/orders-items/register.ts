import { Either, success } from '@/core/either'
import { UseCase } from '@/core/use-cases/use-case'
import { OrderItems } from '@/domain/food-ordering/enterprise/entities/order-items'

import { OrderItemsRepository } from '../../repositories/order-items-repository'

interface RegisterOrderItemsUseCaseProps {
  orderId: string
  productId: string
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL'
  quantity: number
}

type RegisterOrderItemsUseCaseResponse = Either<unknown, { orderItems: OrderItems }>

export class RegisterOrderItemsUseCase implements UseCase {
  constructor(private readonly orderItemsRepository: OrderItemsRepository) {}

  async execute(props: RegisterOrderItemsUseCaseProps): Promise<RegisterOrderItemsUseCaseResponse> {
    const orderItems = OrderItems.create({
      orderId: props.orderId,
      productId: props.productId,
      size: props.size,
      quantity: props.quantity,
      createdAt: new Date(),
    })
    await this.orderItemsRepository.create(orderItems)

    return success({ orderItems })
  }
}
