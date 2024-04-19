import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface ProductProps {
  name: string
  price: number
  imageUrl: string | null
  description: string | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Product extends Entity<ProductProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get price() {
    return this.props.price
  }

  set price(price: number) {
    this.props.price = price
    this.touch()
  }

  get imageUrl() {
    return this.props.imageUrl
  }

  set imageUrl(imageUrl: string | null) {
    this.props.imageUrl = imageUrl
    this.touch()
  }

  get description() {
    return this.props.description
  }

  set description(description: string | null) {
    this.props.description = description
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<ProductProps, 'createdAt'>, id?: UniqueEntityID): Product {
    return new Product(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
