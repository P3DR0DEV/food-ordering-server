import { PrismaClient } from '@prisma/client'

import { UsersRepository } from '@/domain/food-ordering/application/repositories/users-repository'
import { User } from '@/domain/food-ordering/enterprise/entities/user'

import { PrismaUserMapper } from '../mappers/prisma-users-mapper'

export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaClient) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findMany(): Promise<User[]> {
    const users = await this.prisma.user.findMany()

    return users.map((user) => PrismaUserMapper.toDomain(user))
  }

  async findManyByRole(role: 'ADMIN' | 'USER'): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: { role },
    })

    return users.map((user) => PrismaUserMapper.toDomain(user))
  }

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPersistence(user)

    await this.prisma.user.create({
      data,
    })
  }

  async save(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPersistence(user)

    await this.prisma.user.update({
      where: {
        id: raw.id,
      },
      data: raw,
    })
  }

  async delete(id: string): Promise<void> {
    this.prisma.user.delete({
      where: { id },
    })
  }
}
