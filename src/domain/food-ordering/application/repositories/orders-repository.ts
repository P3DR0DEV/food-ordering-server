import { Orders } from '../../enterprise/entities/orders'

export interface OrdersRepository {
  findById(id: string): Promise<Orders | null>
  findManyByUserId(userId: string): Promise<Orders[]>
  findManyByStatus(status: 'New' | 'Preparing' | 'Delivering' | 'Delivered' | 'Cancelled'): Promise<Orders[]>

  create(order: Orders): Promise<void>
}
