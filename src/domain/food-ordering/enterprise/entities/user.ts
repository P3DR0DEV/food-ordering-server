import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { HashPassword } from './value-object/hash-password'

export interface UserProps {
  name: string
  email: string
  password: string
  role: 'ADMIN' | 'USER'
  createdAt: Date
  updatedAt?: Date | null
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  get role() {
    return this.props.role
  }

  set role(role: 'ADMIN' | 'USER') {
    this.props.role = role
    this.touch()
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static async create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityID): Promise<User> {
    const password = await HashPassword.generateHash(props.password)

    return new User(
      {
        ...props,
        password: password.value,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
