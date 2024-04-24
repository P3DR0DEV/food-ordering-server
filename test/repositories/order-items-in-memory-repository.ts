import { OrderItemsRepository } from '@/domain/food-ordering/application/repositories/order-items-repository'
import { OrderItems } from '@/domain/food-ordering/enterprise/entities/order-items'

export class OrderItemsInMemoryRepository implements OrderItemsRepository {
  public items: OrderItems[] = []

  async createMany(orderItems: OrderItems[]): Promise<void> {
    this.items.push(...orderItems)
  }

  async findById(id: string): Promise<OrderItems | null> {
    const item = this.items.find((item) => item.id.toString() === id)

    if (!item) {
      return null
    }

    return item
  }

  async findManyByOrderId(orderId: string): Promise<OrderItems[]> {
    const items = this.items.filter((item) => item.orderId === orderId)

    return items
  }

  async create(orderItems: OrderItems): Promise<void> {
    this.items.push(orderItems)
  }
}
