import { makeUser } from 'test/factories/make-user'
import { UsersInMemoryRepository } from 'test/repositories/users-in-memory-repository'

import { GetUserByEmail } from '../get-user-by-email'

let usersRepository: UsersInMemoryRepository
let sut: GetUserByEmail

describe('Get User By Email use case', () => {
  beforeEach(async () => {
    usersRepository = new UsersInMemoryRepository()
    sut = new GetUserByEmail(usersRepository)
  })
  it('should be able to get a user by email', async () => {
    const newUser = await makeUser({
      email: 'johndoe@example.com',
    })

    await usersRepository.create(newUser)

    const result = await sut.execute('johndoe@example.com')

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      const { user } = result.result

      expect(user.email).toEqual('johndoe@example.com')
      expect(user).toBeTruthy()
    }
  })
})
