import { Either, success } from '@/core/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Token } from '@/domain/food-ordering/enterprise/entities/token'

import { TokenRepository } from '../../repositories/token-repository'

interface SaveTokenUseCaseProps {
  userId: string
  token: string
  expiresAt: Date
}

type SaveTokenUseCaseResponse = Either<unknown, { token: Token }>

export class SaveTokenUseCase implements UseCase {
  constructor(private readonly tokenRepository: TokenRepository) {}

  async execute(props: SaveTokenUseCaseProps): Promise<SaveTokenUseCaseResponse> {
    const token = Token.create({
      userId: props.userId,
      token: props.token,
      expiresAt: props.expiresAt,
    })

    await this.tokenRepository.save(token)

    return success({ token })
  }
}
