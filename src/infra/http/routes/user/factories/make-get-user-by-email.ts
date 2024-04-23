import { GetUserByEmail } from '@/domain/food-ordering/application/use-cases/user/get-user-by-email'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { prisma } from '@/infra/lib/prisma'

const prismaRepository = new PrismaUsersRepository(prisma)
const useCase = new GetUserByEmail(prismaRepository)
export { useCase as getUserByEmailUseCase }
