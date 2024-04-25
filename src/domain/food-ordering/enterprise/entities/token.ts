import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface TokenProps {
  userId: string
  token: string
  expiresAt: Date
  createdAt: Date
  usedAt?: Date
}

export class Token extends Entity<TokenProps> {
  get token() {
    return this.props.token
  }

  get expiresAt() {
    return this.props.expiresAt
  }

  get usedAt() {
    return this.props.usedAt
  }

  get createdAt() {
    return this.props.createdAt
  }

  get userId() {
    return this.props.userId
  }

  static create(props: Optional<TokenProps, 'createdAt'>, id?: UniqueEntityID): Token {
    return new Token(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
