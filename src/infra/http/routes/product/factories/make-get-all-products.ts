import { GetAllProductsUseCase } from '@/domain/food-ordering/application/use-cases/product/get-all-products'
import { PrismaProductRepository } from '@/infra/database/prisma/repositories/prisma-product-repository'
import { prisma } from '@/infra/lib/prisma'

const productsRepository = new PrismaProductRepository(prisma)
const usecase = new GetAllProductsUseCase(productsRepository)

export { usecase as getAllProductsUseCase }
