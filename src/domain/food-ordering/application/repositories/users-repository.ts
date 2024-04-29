import { User } from '../../enterprise/entities/user'

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findMany(role?: 'user' | 'admin'): Promise<User[]>

  create(user: User): Promise<void>
  save(user: User): Promise<void>
  delete(id: string): Promise<void>
}
