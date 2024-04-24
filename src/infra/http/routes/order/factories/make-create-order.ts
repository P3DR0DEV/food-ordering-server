import { RegisterOrderUseCase } from '@/domain/food-ordering/application/use-cases/orders/register'
import { PrismaOrderItemsRepository } from '@/infra/database/prisma/repositories/prisma-order-items-repository'
import { PrismaOrderRepository } from '@/infra/database/prisma/repositories/prisma-order-repository'
import { prisma } from '@/infra/lib/prisma'

const orderRepository = new PrismaOrderRepository(prisma)
const orderItemsRepository = new PrismaOrderItemsRepository(prisma)
const usecase = new RegisterOrderUseCase(orderRepository, orderItemsRepository)

export { usecase as createOrderUseCase }
