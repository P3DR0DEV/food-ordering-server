import { GetUserByIdUseCase } from '@/domain/food-ordering/application/use-cases/user/get-user-by-id'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { prisma } from '@/infra/lib/prisma'

export function makeGetUsersById() {
  const prismaRepository = new PrismaUsersRepository(prisma)
  const useCase = new GetUserByIdUseCase(prismaRepository)
  return useCase
}
