import { Either, success } from '@/core/either'
import { UseCase } from '@/core/use-cases/use-case'
import { User } from '@/domain/food-ordering/enterprise/entities/user'

import { UsersRepository } from '../../repositories/users-repository'

export type GetUsersUseCaseResponse = Either<unknown, { users: User[] }>

export class GetUsersUseCase implements UseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(role?: 'user' | 'admin'): Promise<GetUsersUseCaseResponse> {
    const users = await this.usersRepository.findMany(role)

    return success({ users })
  }
}
