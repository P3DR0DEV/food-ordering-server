import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface OrdersProps {
  userId: string
  total: number
  status: 'New' | 'Preparing' | 'Delivering' | 'Delivered' | 'Cancelled'
  ordersItemsId: string
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

  set status(status: 'New' | 'Preparing' | 'Delivering' | 'Delivered' | 'Cancelled') {
    this.props.status = status
  }

  get ordersItemsId() {
    return this.props.ordersItemsId
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
