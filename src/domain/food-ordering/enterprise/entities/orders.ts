import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { OrderItems } from './order-items'

export interface OrdersProps {
  userId: string
  total: number
  status: 'New' | 'Preparing' | 'Delivering' | 'Delivered'
  items: OrderItems[]
  createdAt: Date
  updatedAt?: Date | null
}

export class Orders extends Entity<OrdersProps> {
  get userId() {
    return this.props.userId
  }

  get total() {
    return this.props.total
  }

  get status() {
    return this.props.status
  }

  set status(status: 'New' | 'Preparing' | 'Delivering' | 'Delivered') {
    this.props.status = status
  }

  get items() {
    return this.props.items
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: Optional<OrdersProps, 'createdAt'>, id?: UniqueEntityID) {
    return new Orders(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
