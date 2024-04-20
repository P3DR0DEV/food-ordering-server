import { Either, failure, success } from '@/core/either'
import { BadRequest } from '@/core/errors/bad-request'
import { NotFound } from '@/core/errors/not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { Product } from '@/domain/food-ordering/enterprise/entities/product'

import { ProductsRepository } from '../../repositories/product-repository'

type GetProductByIdUseCaseResponse = Either<BadRequest | NotFound, { product: Product }>

export class GetProductByIdUseCase implements UseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(id: string): Promise<GetProductByIdUseCaseResponse> {
    if (!id) {
      return failure(new BadRequest('Id is required'))
    }

    const product = await this.productsRepository.findById(id)

    if (!product) {
      return failure(new NotFound('Product not found'))
    }

    return success({ product })
  }
}
