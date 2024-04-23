import { GetUsersUseCase } from '@/domain/food-ordering/application/use-cases/user/get-users'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { prisma } from '@/infra/lib/prisma'

const prismaRepository = new PrismaUsersRepository(prisma)
const useCase = new GetUsersUseCase(prismaRepository)

export { useCase as getUsersUseCase }
