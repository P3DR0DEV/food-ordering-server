import { makeUser } from 'test/factories/make-user'
import { UsersInMemoryRepository } from 'test/repositories/users-in-memory-repository'

import { BadRequest } from '@/core/errors/bad-request'

import { DeleteUserUseCase } from '../delete-user'

let usersRepository: UsersInMemoryRepository
let sut: DeleteUserUseCase

describe('delete User use case', () => {
  beforeEach(async () => {
    usersRepository = new UsersInMemoryRepository()
    sut = new DeleteUserUseCase(usersRepository)
  })

  it('should be able to delete a user', async () => {
    const newUser = await makeUser()

    await usersRepository.create(newUser)

    const result = await sut.execute(newUser.id.toString())
    expect(result.hasSucceeded()).toBeTruthy()

    const secondResult = await sut.execute()

    expect(secondResult.hasFailed()).toBeTruthy()

    if (secondResult.hasFailed()) {
      expect(secondResult.reason).toBeInstanceOf(BadRequest)
    }
  })
})
