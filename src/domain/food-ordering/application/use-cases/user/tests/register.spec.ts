import { UsersInMemoryRepository } from 'test/repositories/users-in-memory-repository'

import { RegisterUserUseCase } from '../register'

let usersRepository: UsersInMemoryRepository
let sut: RegisterUserUseCase

describe('Register User use case', () => {
  beforeEach(async () => {
    usersRepository = new UsersInMemoryRepository()
    sut = new RegisterUserUseCase(usersRepository)
  })

  it('should be able to register a user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: 'user',
    })

    expect(result.hasSucceeded()).toBeTruthy()

    expect(usersRepository.users).toHaveLength(1)

    if (result.hasSucceeded()) {
      const { user } = result.result

      expect(user.name).toEqual('John Doe')
      expect(user.email).toEqual('johndoe@example.com')
      expect(user.role).toEqual('USER')
      expect(user.password).not.toEqual('123456')
    }

    const secondUser = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: 'user',
    })

    expect(secondUser.hasSucceeded()).toBeFalsy()
  })
})
