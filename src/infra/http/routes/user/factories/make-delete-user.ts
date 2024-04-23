import { DeleteUserUseCase } from '@/domain/food-ordering/application/use-cases/user/delete-user'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { prisma } from '@/infra/lib/prisma'

const prismaRepository = new PrismaUsersRepository(prisma)
const useCase = new DeleteUserUseCase(prismaRepository)
export { useCase as deleteUserUseCase }
