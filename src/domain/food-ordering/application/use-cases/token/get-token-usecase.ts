import { Either, failure, success } from '@/core/either'
import { BadRequest } from '@/core/errors/bad-request'
import { UseCase } from '@/core/use-cases/use-case'
import { Token } from '@/domain/food-ordering/enterprise/entities/token'

import { TokenRepository } from '../../repositories/token-repository'

type GetTokenUseCaseResponse = Either<BadRequest, { tokens: Token[] }>

export class GetTokenUseCase implements UseCase {
  constructor(private readonly tokenRepository: TokenRepository) {}

  async execute(userId: string): Promise<GetTokenUseCaseResponse> {
    if (!userId) {
      return failure(new BadRequest('User id is required'))
    }

    const tokens = await this.tokenRepository.get(userId)

    return success({ tokens })
  }
}
