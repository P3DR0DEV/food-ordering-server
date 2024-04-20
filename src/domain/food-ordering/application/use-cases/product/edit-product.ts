import { Either, failure, success } from '@/core/either'
import { BadRequest } from '@/core/errors/bad-request'
import { NotFound } from '@/core/errors/not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { Product } from '@/domain/food-ordering/enterprise/entities/product'

import { ProductsRepository } from '../../repositories/product-repository'

interface EditProductUseCaseProps {
  id: string
  name: string
  price: number
  description: string | null
  imageUrl: string | null
}

type EditProductUseCaseResponse = Either<BadRequest | NotFound, { product: Product }>

export class EditProductUseCase implements UseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute({
    id,
    name,
    price,
    description,
    imageUrl,
  }: EditProductUseCaseProps): Promise<EditProductUseCaseResponse> {
    if (!id) {
      return failure(new BadRequest('Id is required'))
    }

    const product = await this.productsRepository.findById(id)

    if (!product) {
      return failure(new NotFound('Product not found'))
    }

    product.name = name
    product.price = price
    product.description = description
    product.imageUrl = imageUrl

    return success({ product })
  }
}
