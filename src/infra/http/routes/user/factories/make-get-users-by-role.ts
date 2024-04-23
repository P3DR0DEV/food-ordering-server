import { GetUsersByRoleUseCase } from '@/domain/food-ordering/application/use-cases/user/get-users-by-role'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { prisma } from '@/infra/lib/prisma'

export function makeGetUsersByRole() {
  const prismaRepository = new PrismaUsersRepository(prisma)
  const useCase = new GetUsersByRoleUseCase(prismaRepository)

  return useCase
}
