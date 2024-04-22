import { UsersRepository } from '@/domain/food-ordering/application/repositories/users-repository'
import { RegisterUserUseCase } from '@/domain/food-ordering/application/use-cases/user/register'

export class CreateUserUseCaseAdapter extends RegisterUserUseCase {
  constructor(usersRepository: UsersRepository) {
    super(usersRepository)
  }
}
