import { DeleteProductUseCase } from '@/domain/food-ordering/application/use-cases/product/delete-product'
import { PrismaProductRepository } from '@/infra/database/prisma/repositories/prisma-product-repository'
import { prisma } from '@/infra/lib/prisma'

const prismaRepository = new PrismaProductRepository(prisma)
const useCase = new DeleteProductUseCase(prismaRepository)

export { useCase as deleteProductUseCase }
