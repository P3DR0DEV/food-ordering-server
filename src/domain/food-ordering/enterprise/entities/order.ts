import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { OrderItems } from './order-items'

export interface OrdersProps {
  userId: string
  total: number
  status: 'NEW' | 'PREPARING' | 'DELIVERING' | 'DELIVERED' | 'CANCELLED'
  OrderItems: OrderItems[]
  createdAt: Date
  updatedAt?: Date | null
}

export class Order extends Entity<OrdersProps> {
  get userId() {
    return this.props.userId
  }

  get total() {
    return this.props.total
  }

  get status() {
    return this.props.status
  }

  set status(status: 'NEW' | 'PREPARING' | 'DELIVERING' | 'DELIVERED' | 'CANCELLED') {
    this.props.status = status
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get OrderItems() {
    return this.props.OrderItems
  }

  set OrderItems(orderItems: OrderItems[]) {
    this.props.OrderItems = orderItems
  }

  static create(props: Optional<OrdersProps, 'status' | 'createdAt'>, id?: UniqueEntityID) {
    return new Order(
      {
        ...props,
        status: props.status ?? 'NEW',
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
