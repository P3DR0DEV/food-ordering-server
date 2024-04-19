import { makeUser } from 'test/factories/make-user'
import { UsersInMemoryRepository } from 'test/repositories/users-in-memory-repository'

import { BadRequest } from '@/core/errors/bad-request'

import { EditUserUseCase } from '../edit-user'

let usersRepository: UsersInMemoryRepository
let sut: EditUserUseCase

describe('Edit User use case', () => {
  beforeEach(async () => {
    usersRepository = new UsersInMemoryRepository()
    sut = new EditUserUseCase(usersRepository)
  })
  it('should be able to edit a user', async () => {
    const newUser = await makeUser()
    const secondUser = await makeUser()

    const previousEmail = newUser.email
    const secondUserEmail = secondUser.email

    await usersRepository.create(secondUser)
    await usersRepository.create(newUser)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      id: newUser.id.toString(),
      name: newUser.name,
      role: newUser.role,
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      const { user } = result.result

      expect(user.name).toEqual(newUser.name)
      expect(user.email === previousEmail).toBeFalsy()
    }

    const secondResult = await sut.execute({
      email: 'johndoe@example.com',
      id: secondUser.id.toString(),
      name: secondUser.name,
      role: secondUser.role,
    })

    expect(secondResult.hasFailed()).toBeTruthy()

    if (secondResult.hasFailed()) {
      expect(secondResult.reason).toBeInstanceOf(BadRequest)
    }
    expect(secondUser.email).toEqual(secondUserEmail)
  })
})
