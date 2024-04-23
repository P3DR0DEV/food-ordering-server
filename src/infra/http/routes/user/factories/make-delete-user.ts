import { DeleteUserUseCase } from '@/domain/food-ordering/application/use-cases/user/delete-user'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { prisma } from '@/infra/lib/prisma'

export function makeDeleteUser() {
  const prismaRepository = new PrismaUsersRepository(prisma)
  const useCase = new DeleteUserUseCase(prismaRepository)
  return useCase
}
