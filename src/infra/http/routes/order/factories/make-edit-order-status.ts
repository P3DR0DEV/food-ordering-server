import { EditOrderStatusUseCase } from '@/domain/food-ordering/application/use-cases/orders/edit-order-status'
import { PrismaOrderRepository } from '@/infra/database/prisma/repositories/prisma-order-repository'
import { prisma } from '@/infra/lib/prisma'

const prismaRepository = new PrismaOrderRepository(prisma)

const useCase = new EditOrderStatusUseCase(prismaRepository)

export { useCase as editOrderStatusUseCase }
