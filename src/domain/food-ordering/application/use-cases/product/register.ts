import { Either, failure, success } from '@/core/either'
import { BadRequest } from '@/core/errors/bad-request'
import { UseCase } from '@/core/use-cases/use-case'
import { Product } from '@/domain/food-ordering/enterprise/entities/product'

import { ProductsRepository } from '../../repositories/product-repository'

interface RegisterProductUseCaseProps {
  name: string
  price: number
  description: string | null
  imageUrl: string | null
}

type RegisterProductUseCaseResponse = Either<BadRequest, { product: Product }>

export class RegisterProductUseCase implements UseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(props: RegisterProductUseCaseProps): Promise<RegisterProductUseCaseResponse> {
    if (props.price <= 0) {
      return failure(new BadRequest('Price must be greater than 0'))
    }

    if (!props.name) {
      return failure(new BadRequest('Name is required'))
    }

    const product = Product.create({
      name: props.name,
      price: props.price,
      description: props.description,
      imageUrl: props.imageUrl,
    })

    await this.productsRepository.create(product)

    return success({ product })
  }
}
