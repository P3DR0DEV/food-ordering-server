import { OrderItems } from '../../enterprise/entities/order-items'

export interface OrderItemsRepository {
  findById(id: string): Promise<OrderItems | null>
  findManyByOrderId(orderId: string): Promise<OrderItems[]>

  createMany(orderItems: OrderItems[]): Promise<void>
  create(orderItems: OrderItems): Promise<void>
}
