import { GetOrderByIdUseCase } from '@/domain/food-ordering/application/use-cases/orders/get-order-by-id'
import { PrismaOrderRepository } from '@/infra/database/prisma/repositories/prisma-order-repository'
import { prisma } from '@/infra/lib/prisma'

const prismaRepository = new PrismaOrderRepository(prisma)
const useCase = new GetOrderByIdUseCase(prismaRepository)

export { useCase as getOrderByIdUseCase }
