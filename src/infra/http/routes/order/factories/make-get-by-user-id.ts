import { GetOrdersByUserIdUseCase } from '@/domain/food-ordering/application/use-cases/orders/get-orders-by-user-id'
import { PrismaOrderRepository } from '@/infra/database/prisma/repositories/prisma-order-repository'
import { prisma } from '@/infra/lib/prisma'

const orderRepository = new PrismaOrderRepository(prisma)
const useCase = new GetOrdersByUserIdUseCase(orderRepository)

export { useCase as getOrdersByUserIdUseCase }
