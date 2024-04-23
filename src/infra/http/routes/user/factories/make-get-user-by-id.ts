import { GetUserByIdUseCase } from '@/domain/food-ordering/application/use-cases/user/get-user-by-id'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { prisma } from '@/infra/lib/prisma'

const prismaRepository = new PrismaUsersRepository(prisma)
const useCase = new GetUserByIdUseCase(prismaRepository)
export { useCase as getUserByIdUseCase }
