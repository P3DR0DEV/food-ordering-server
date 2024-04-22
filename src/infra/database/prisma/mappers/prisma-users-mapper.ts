import { Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/food-ordering/enterprise/entities/user'

export class PrismaUserMapper {
  //! from prisma (database [persistence layer]) to domain
  static toDomain(raw: Prisma.UserUncheckedCreateInput): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        role: raw.role,
      },
      new UniqueEntityID(raw.id),
    )
  }

  //! from domain to prisma (database [persistence layer])
  static toPersistence(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    }
  }
}
