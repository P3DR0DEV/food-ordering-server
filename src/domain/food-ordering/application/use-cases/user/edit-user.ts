import { Either, failure, success } from '@/core/either'
import { BadRequest } from '@/core/errors/bad-request'
import { NotFound } from '@/core/errors/not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { User } from '@/domain/food-ordering/enterprise/entities/user'

import { UsersRepository } from '../../repositories/users-repository'

interface EditUserUseCaseProps {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'USER'
}

type EditUserUseCaseResponse = Either<BadRequest | NotFound, { user: User }>
export class EditUserUseCase implements UseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ id, name, email, role }: EditUserUseCaseProps): Promise<EditUserUseCaseResponse> {
    if (!id) {
      return failure(new BadRequest('Invalid id'))
    }

    const user = await this.usersRepository.findById(id)

    if (!user) {
      return failure(new NotFound('User not found'))
    }

    const existingUser = await this.usersRepository.findByEmail(email)

    if (existingUser && existingUser.id !== user.id) {
      return failure(new BadRequest('Email already in use'))
    }

    user.name = name
    user.email = email
    user.role = role

    await this.usersRepository.save(user)

    return success({ user })
  }
}
