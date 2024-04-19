import { makeUser } from 'test/factories/make-user'
import { UsersInMemoryRepository } from 'test/repositories/users-in-memory-repository'

import { GetUserByIdUseCase } from '../get-user-by-id'

let usersRepository: UsersInMemoryRepository
let sut: GetUserByIdUseCase

describe('Get User By ID use case', () => {
  beforeEach(async () => {
    usersRepository = new UsersInMemoryRepository()
    sut = new GetUserByIdUseCase(usersRepository)
  })
  it('should be able to get a user by ID', async () => {
    const newUser = await makeUser()
    usersRepository.create(newUser)

    const result = await sut.execute(newUser.id.toString())

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      const { user } = result.result

      expect(user.id.toString()).toEqual(newUser.id.toString())
    }
  })
})
