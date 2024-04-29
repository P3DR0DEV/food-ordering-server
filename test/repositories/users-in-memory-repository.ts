import { UsersRepository } from '@/domain/food-ordering/application/repositories/users-repository'
import { User } from '@/domain/food-ordering/enterprise/entities/user'

export class UsersInMemoryRepository implements UsersRepository {
  public users: User[] = []

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id.toString() === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findMany(role?: 'USER' | 'ADMIN'): Promise<User[]> {
    if (role) {
      return this.users.filter((user) => user.role === role)
    }

    return this.users
  }

  async create(user: User): Promise<void> {
    this.users.push(user)
  }

  async save(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.id === user.id)

    this.users[index] = user
  }

  async delete(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id.toString() === id)

    this.users.splice(index, 1)
  }
}
