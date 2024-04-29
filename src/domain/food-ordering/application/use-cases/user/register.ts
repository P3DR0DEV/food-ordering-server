import { Either, failure, success } from '@/core/either'
import { BadRequest } from '@/core/errors/bad-request'
import { UseCase } from '@/core/use-cases/use-case'
import { User } from '@/domain/food-ordering/enterprise/entities/user'
import { HashPassword } from '@/domain/food-ordering/enterprise/entities/value-object/hash-password'

import { UsersRepository } from '../../repositories/users-repository'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
  role?: 'admin' | 'user'
}

type RegisterUserUseCaseResponse = Either<BadRequest, { user: User }>

export class RegisterUserUseCase implements UseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ name, email, password, role }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      return failure(new BadRequest('User already exists'))
    }

    const passwordHash = await HashPassword.generateHash(password)

    const user = User.create({
      name,
      email,
      password: passwordHash,
      role,
    })

    await this.usersRepository.create(user)

    return success({ user })
  }
}
