import { Either, success } from '@/core/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Order } from '@/domain/food-ordering/enterprise/entities/order'
import { OrderItems } from '@/domain/food-ordering/enterprise/entities/order-items'

import { OrderItemsRepository } from '../../repositories/order-items-repository'
import { OrderRepository } from '../../repositories/order-repository'

type RegisterOrderUseCaseRequest = {
  userId: string
  total: number
  status?: 'NEW' | 'PREPARING' | 'DELIVERING' | 'DELIVERED' | 'CANCELLED'
  orderItems?: {
    productId: string
    quantity: number
    size: 'S' | 'M' | 'L' | 'XL' | 'XXL'
  }[]
}

type RegisterOrderUseCaseResponse = Either<unknown, { order: Order }>

export class RegisterOrderUseCase implements UseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderItemsRepository: OrderItemsRepository,
  ) {}

  async execute(props: RegisterOrderUseCaseRequest): Promise<RegisterOrderUseCaseResponse> {
    const order = Order.create({
      userId: props.userId,
      total: props.total,
      status: props.status ?? 'NEW',
      orderItems: [],
    })

    const items = props.orderItems?.map((item) => {
      return OrderItems.create({
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
        orderId: order.id.toString(),
      })
    })

    await this.orderRepository.create(order)
    if (!items) return success({ order })

    order.orderItems = items

    await this.orderItemsRepository.createMany(items)
    return success({ order })
  }
}
