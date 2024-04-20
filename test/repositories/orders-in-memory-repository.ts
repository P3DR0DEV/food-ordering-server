import { OrdersRepository } from '@/domain/food-ordering/application/repositories/orders-repository'
import { Orders } from '@/domain/food-ordering/enterprise/entities/orders'

export class OrdersInMemoryRepository implements OrdersRepository {
  public items: Orders[] = []

  async findById(id: string): Promise<Orders | null> {
    const order = this.items.find((order) => order.id.toString() === id)

    if (!order) {
      return null
    }

    return order
  }

  async findManyByUserId(userId: string): Promise<Orders[]> {
    const orders = this.items.filter((order) => order.userId === userId)

    return orders
  }

  async findManyByStatus(status: 'New' | 'Preparing' | 'Delivering' | 'Delivered' | 'Cancelled'): Promise<Orders[]> {
    const orders = this.items.filter((order) => order.status === status)

    return orders
  }

  async create(order: Orders): Promise<void> {
    this.items.push(order)
  }
}
