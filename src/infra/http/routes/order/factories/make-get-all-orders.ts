import { GetAllOrdersUseCase } from '@/domain/food-ordering/application/use-cases/orders/get-all-orders'
import { PrismaOrderRepository } from '@/infra/database/prisma/repositories/prisma-order-repository'
import { prisma } from '@/infra/lib/prisma'

const orderRepository = new PrismaOrderRepository(prisma)
const usecase = new GetAllOrdersUseCase(orderRepository)

export { usecase as getAllOrdersUseCase }
