import { makeUser } from 'test/factories/make-user'
import { UsersInMemoryRepository } from 'test/repositories/users-in-memory-repository'

import { GetUsersUseCase } from '../get-users'

let usersRepository: UsersInMemoryRepository
let sut: GetUsersUseCase

describe('Get all users use case', () => {
  beforeEach(async () => {
    usersRepository = new UsersInMemoryRepository()
    sut = new GetUsersUseCase(usersRepository)
  })
  it('should be able to get a list of users', async () => {
    for (let i = 0; i < 10; i++) {
      const user = await makeUser()
      usersRepository.create(user)
    }

    const result = await sut.execute()

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      const { users } = result.result

      expect(users).toHaveLength(10)
    }
  })
})
