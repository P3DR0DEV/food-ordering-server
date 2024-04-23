import { GetProductByIdUseCase } from '@/domain/food-ordering/application/use-cases/product/get-product-by-id'
import { PrismaProductRepository } from '@/infra/database/prisma/repositories/prisma-product-repository'
import { prisma } from '@/infra/lib/prisma'

export function makeGetProductById() {
  const productsRepository = new PrismaProductRepository(prisma)
  const usecase = new GetProductByIdUseCase(productsRepository)

  return usecase
}
