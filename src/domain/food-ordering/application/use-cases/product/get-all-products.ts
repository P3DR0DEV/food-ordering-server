import { Either, success } from '@/core/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Product } from '@/domain/food-ordering/enterprise/entities/product'

import { ProductsRepository } from '../../repositories/product-repository'

type GetAllProductsUseCaseResponse = Either<unknown, { products: Product[] }>
export class GetAllProductsUseCase implements UseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(): Promise<GetAllProductsUseCaseResponse> {
    const products = await this.productsRepository.findMany()

    return success({ products })
  }
}
