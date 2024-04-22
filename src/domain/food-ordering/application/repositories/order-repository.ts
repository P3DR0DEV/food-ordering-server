import { Order } from '../../enterprise/entities/order'

export interface OrderRepository {
  findById(id: string): Promise<Order | null>
  findMany(): Promise<Order[]>
  findManyByUserId(userId: string): Promise<Order[]>
  findManyByStatus(status: 'NEW' | 'PREPARING' | 'DELIVERING' | 'DELIVERED' | 'CANCELLED'): Promise<Order[]>
  updateStatus(orderId: string, status: 'PREPARING' | 'DELIVERING' | 'DELIVERED' | 'CANCELLED'): Promise<Order | null>

  create(order: Order): Promise<void>
}
