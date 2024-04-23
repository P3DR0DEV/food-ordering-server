import { RegisterOrderUseCase } from '@/domain/food-ordering/application/use-cases/orders/register'
import { PrismaOrderRepository } from '@/infra/database/prisma/repositories/prisma-order-repository'
import { prisma } from '@/infra/lib/prisma'

const orderRepository = new PrismaOrderRepository(prisma)

const usecase = new RegisterOrderUseCase(orderRepository)

export { usecase as createOrderUseCase }
