import { Either, failure, success } from '@/core/either'
import { BadRequest } from '@/core/errors/bad-request'
import { UseCase } from '@/core/use-cases/use-case'

import { UsersRepository } from '../../repositories/users-repository'

type DeleteUserUseCaseResponse = Either<BadRequest, { message: string }>

export class DeleteUserUseCase implements UseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string): Promise<DeleteUserUseCaseResponse> {
    if (!id) {
      return failure(new BadRequest('Invalid id'))
    }

    await this.usersRepository.delete(id)

    return success({ message: 'User deleted successfully' })
  }
}
