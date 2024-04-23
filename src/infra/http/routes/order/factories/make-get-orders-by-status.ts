import { GetOrdersByStatusUseCase } from '@/domain/food-ordering/application/use-cases/orders/get-orders-by-status'
import { PrismaOrderRepository } from '@/infra/database/prisma/repositories/prisma-order-repository'
import { prisma } from '@/infra/lib/prisma'

const orderRepository = new PrismaOrderRepository(prisma)
const usecase = new GetOrdersByStatusUseCase(orderRepository)

export { usecase as getOrdersByStatusUseCase }
