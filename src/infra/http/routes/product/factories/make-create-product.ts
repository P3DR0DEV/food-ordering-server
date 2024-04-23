import { RegisterProductUseCase } from '@/domain/food-ordering/application/use-cases/product/register'
import { PrismaProductRepository } from '@/infra/database/prisma/repositories/prisma-product-repository'
import { prisma } from '@/infra/lib/prisma'

export function makeCreateProduct() {
  const productsRepository = new PrismaProductRepository(prisma)

  const usecase = new RegisterProductUseCase(productsRepository)

  return usecase
}
