import { Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/food-ordering/enterprise/entities/user'
import { UserRoleMapper } from '@/infra/util/user-role-mapper'

export class PrismaUserMapper {
  //! from prisma (database [persistence layer]) to domain
  static toDomain(raw: Prisma.UserUncheckedCreateInput): User {
    const role = UserRoleMapper.toDomain(raw.role)
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        role,
      },
      new UniqueEntityID(raw.id),
    )
  }

  //! from domain to prisma (database [persistence layer])
  static toPersistence(user: User): Prisma.UserUncheckedCreateInput {
    const role = UserRoleMapper.toPersistence(user.role)
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      role,
    }
  }
}
