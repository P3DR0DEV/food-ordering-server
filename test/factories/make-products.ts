import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Product, ProductProps } from '@/domain/food-ordering/enterprise/entities/product'

export function makeProducts(override: Partial<ProductProps> = {}, id?: UniqueEntityID) {
  return Product.create(
    {
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      imageUrl: faker.image.url(),
      description: faker.commerce.productDescription(),
      ...override,
    },
    id,
  )
}
