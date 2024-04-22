import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserProps } from '@/domain/food-ordering/enterprise/entities/user'

export async function makeUser(override: Partial<UserProps> = {}, id?: UniqueEntityID) {
  const user = await User.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'USER',
      ...override,
    },
    id,
  )

  return user
}
