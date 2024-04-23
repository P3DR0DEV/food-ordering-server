import { GetUsersUseCase } from '@/domain/food-ordering/application/use-cases/user/get-users'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { prisma } from '@/infra/lib/prisma'

export function makeGetUsers() {
  const prismaRepository = new PrismaUsersRepository(prisma)
  const useCase = new GetUsersUseCase(prismaRepository)

  return useCase
}
