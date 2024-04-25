import { TokenInMemoryRepository } from 'test/repositories/tokens-in-memory-repository'

import { SaveTokenUseCase } from '../save-token-usecase'

let tokenRepository: TokenInMemoryRepository
let sut: SaveTokenUseCase

describe('SaveTokenUseCase', () => {
  beforeEach(() => {
    tokenRepository = new TokenInMemoryRepository()
    sut = new SaveTokenUseCase(tokenRepository)
  })

  it('should be able to save token', async () => {
    const result = await sut.execute({
      userId: 'any_user_id',
      token: 'any_token',
      expiresAt: new Date(),
    })

    expect(result.hasSucceeded()).toBe(true)
  })
})
