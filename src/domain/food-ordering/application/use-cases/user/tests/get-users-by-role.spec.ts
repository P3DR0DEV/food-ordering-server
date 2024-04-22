import { makeUser } from 'test/factories/make-user'
import { UsersInMemoryRepository } from 'test/repositories/users-in-memory-repository'

import { GetUsersByRoleUseCase } from '../get-users-by-role'

let usersRepository: UsersInMemoryRepository
let sut: GetUsersByRoleUseCase

describe('Get Users By Role use case', () => {
  beforeEach(async () => {
    usersRepository = new UsersInMemoryRepository()
    sut = new GetUsersByRoleUseCase(usersRepository)
  })
  it('should be able to get users by role', async () => {
    const newUser = await makeUser()

    await usersRepository.create(newUser)

    const result = await sut.execute('USER')

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      const { users } = result.result

      expect(users).toHaveLength(1)
    }
  })
})
