import { EditProductUseCase } from '@/domain/food-ordering/application/use-cases/product/edit-product'
import { PrismaProductRepository } from '@/infra/database/prisma/repositories/prisma-product-repository'
import { prisma } from '@/infra/lib/prisma'

const productRepository = new PrismaProductRepository(prisma)
const useCase = new EditProductUseCase(productRepository)

export { useCase as editProductUseCase }
