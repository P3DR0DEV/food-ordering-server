import { Either, failure, success } from '@/core/either'
import { BadRequest } from '@/core/errors/bad-request'
import { UseCase } from '@/core/use-cases/use-case'

import { ProductsRepository } from '../../repositories/product-repository'

type DeleteProductUseCaseResponse = Either<BadRequest, { message: string }>

export class DeleteProductUseCase implements UseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(id: string): Promise<DeleteProductUseCaseResponse> {
    if (!id) {
      return failure(new BadRequest('Id is required'))
    }

    await this.productsRepository.delete(id)

    return success({ message: 'Product deleted successfully' })
  }
}
