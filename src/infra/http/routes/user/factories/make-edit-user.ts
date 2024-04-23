import { EditUserUseCase } from '@/domain/food-ordering/application/use-cases/user/edit-user'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { prisma } from '@/infra/lib/prisma'

export function makeEditUser() {
  const prismaRepository = new PrismaUsersRepository(prisma)
  const useCase = new EditUserUseCase(prismaRepository)
  return useCase
}
