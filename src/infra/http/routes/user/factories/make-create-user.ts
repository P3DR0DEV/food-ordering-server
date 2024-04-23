import { RegisterUserUseCase } from '@/domain/food-ordering/application/use-cases/user/register'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { prisma } from '@/infra/lib/prisma'

const prismaRepository = new PrismaUsersRepository(prisma)
const useCase = new RegisterUserUseCase(prismaRepository)

export { useCase as registerUserUseCase }
