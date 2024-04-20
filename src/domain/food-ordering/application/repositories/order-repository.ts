import { Order } from '../../enterprise/entities/order'

export interface OrderRepository {
  findById(id: string): Promise<Order | null>
  findMany(): Promise<Order[]>
  findManyByUserId(userId: string): Promise<Order[]>
  findManyByStatus(status: 'New' | 'Preparing' | 'Delivering' | 'Delivered' | 'Cancelled'): Promise<Order[]>
  updateStatus(orderId: string, status: 'Preparing' | 'Delivering' | 'Delivered' | 'Cancelled'): Promise<Order | null>

  create(order: Order): Promise<void>
}
