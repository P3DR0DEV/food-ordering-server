import { OrderRepository } from '@/domain/food-ordering/application/repositories/order-repository'
import { Order } from '@/domain/food-ordering/enterprise/entities/order'

export class OrderInMemoryRepository implements OrderRepository {
  public items: Order[] = []

  async findMany(): Promise<Order[]> {
    return this.items
  }

  async findById(id: string): Promise<Order | null> {
    const order = this.items.find((order) => order.id.toString() === id)

    if (!order) {
      return null
    }

    return order
  }

  async findManyByUserId(userId: string): Promise<Order[]> {
    const order = this.items.filter((order) => order.userId === userId)

    return order
  }

  async findManyByStatus(status: 'new' | 'preparing' | 'delivering' | 'delivered' | 'cancelled'): Promise<Order[]> {
    const order = this.items.filter((order) => order.status === status)

    return order
  }

  async updateStatus(
    orderId: string,
    status: 'preparing' | 'delivering' | 'delivered' | 'cancelled',
  ): Promise<Order | null> {
    const order = this.items.find((order) => order.id.toString() === orderId)

    if (!order) {
      return null
    }

    order.status = status

    return order
  }

  async create(order: Order): Promise<void> {
    this.items.push(order)
  }
}
