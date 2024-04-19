import { Either, failure, success } from '@/core/either'
import { BadRequest } from '@/core/errors/bad-request'
import { NotFound } from '@/core/errors/not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { User } from '@/domain/food-ordering/enterprise/entities/user'

import { UsersRepository } from '../../repositories/users-repository'

type GetUserByIdUseCaseResponse = Either<BadRequest | NotFound, { user: User }>

export class GetUserByIdUseCase implements UseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string): Promise<GetUserByIdUseCaseResponse> {
    if (!id) {
      return failure(new BadRequest('Invalid id'))
    }

    const user = await this.usersRepository.findById(id)

    if (!user) {
      return failure(new NotFound('User not found'))
    }

    return success({ user })
  }
}
