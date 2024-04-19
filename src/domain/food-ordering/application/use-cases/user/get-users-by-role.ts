import { Either, failure, success } from '@/core/either'
import { BadRequest } from '@/core/errors/bad-request'
import { UseCase } from '@/core/use-cases/use-case'
import { User } from '@/domain/food-ordering/enterprise/entities/user'

import { UsersRepository } from '../../repositories/users-repository'

type GetUsersByRoleUseCaseResponse = Either<BadRequest, { users: User[] }>

export class GetUsersByRoleUseCase implements UseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(role: 'admin' | 'user'): Promise<GetUsersByRoleUseCaseResponse> {
    if (!['admin', 'user'].includes(role)) {
      return failure(new BadRequest('Invalid role'))
    }
    const users = await this.usersRepository.findManyByRole(role)

    return success({ users })
  }
}
