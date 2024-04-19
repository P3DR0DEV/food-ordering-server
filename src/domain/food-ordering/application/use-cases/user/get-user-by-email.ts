import { Either, failure, success } from '@/core/either'
import { NotFound } from '@/core/errors/not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { User } from '@/domain/food-ordering/enterprise/entities/user'

import { UsersRepository } from '../../repositories/users-repository'

type GetUserByEmailResponse = Either<NotFound, { user: User }>

export class GetUserByEmail implements UseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(email: string): Promise<GetUserByEmailResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return failure(new NotFound('User not found'))
    }

    return success({ user })
  }
}
