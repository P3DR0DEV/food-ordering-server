import { Order } from '../../enterprise/entities/order'

export interface OrderRepository {
  findById(id: string): Promise<Order | null>
  findMany(status?: 'new' | 'preparing' | 'delivering' | 'delivered' | 'cancelled'): Promise<Order[]>
  findManyByUserId(userId: string): Promise<Order[]>
  updateStatus(orderId: string, status: 'preparing' | 'delivering' | 'delivered' | 'cancelled'): Promise<Order | null>

  create(order: Order): Promise<void>
}
