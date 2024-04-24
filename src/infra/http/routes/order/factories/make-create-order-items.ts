import { RegisterOrderItemsUseCase } from '@/domain/food-ordering/application/use-cases/orders-items/register'
import { PrismaOrderItemsRepository } from '@/infra/database/prisma/repositories/prisma-order-items-repository'
import { prisma } from '@/infra/lib/prisma'

const orderItemsRepository = new PrismaOrderItemsRepository(prisma)
const useCase = new RegisterOrderItemsUseCase(orderItemsRepository)

export { useCase as createOrderItemsUseCase }
