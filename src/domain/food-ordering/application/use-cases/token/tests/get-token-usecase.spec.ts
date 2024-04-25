import { makeUser } from 'test/factories/make-user'
import { TokenInMemoryRepository } from 'test/repositories/tokens-in-memory-repository'

import { GetTokenUseCase } from '../get-token-usecase'
import { SaveTokenUseCase } from '../save-token-usecase'

let tokenRepository: TokenInMemoryRepository
let save: SaveTokenUseCase
let sut: GetTokenUseCase

describe('GetTokenUseCase', () => {
  beforeEach(() => {
    tokenRepository = new TokenInMemoryRepository()
    sut = new GetTokenUseCase(tokenRepository)
    save = new SaveTokenUseCase(tokenRepository)
  })
  it('should be able to get tokens by user id', async () => {
    const user = await makeUser()

    const _ = await save.execute({
      userId: user.id.toString(),
      token: 'any_token',
      expiresAt: new Date(),
    })

    if (_.hasSucceeded()) {
      const { token } = _.result
      user.tokens.push(token)
    }

    const result = await sut.execute(user.id.toString())

    expect(result.hasSucceeded()).toBe(true)

    if (result.hasSucceeded()) {
      const { tokens } = result.result
      expect(tokens).toHaveLength(1)

      expect(user.tokens).toHaveLength(1)
      console.log(user.tokens)
    }
  })
})
