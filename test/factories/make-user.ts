import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserProps } from '@/domain/food-ordering/enterprise/entities/user'

export async function makeUser(override: Partial<UserProps> = {}, id?: UniqueEntityID) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'user',
      ...override,
    },
    id,
  )

  return user
}
