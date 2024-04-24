import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface OrderItemsProps {
  orderId: string
  productId: string
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL'
  quantity: number
  createdAt: Date
  updatedAt?: Date | null
}

export class OrderItems extends Entity<OrderItemsProps> {
  get orderId() {
    return this.props.orderId
  }

  get productId() {
    return this.props.productId
  }

  get size() {
    return this.props.size
  }

  get quantity() {
    return this.props.quantity
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<OrderItemsProps, 'createdAt'>, id?: UniqueEntityID) {
    return new OrderItems(
      {
        ...props,
        createdAt: props.createdAt || new Date(),
      },
      id,
    )
  }
}
