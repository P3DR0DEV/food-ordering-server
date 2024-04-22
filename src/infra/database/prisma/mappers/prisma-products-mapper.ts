import { Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Product } from '@/domain/food-ordering/enterprise/entities/product'

export class PrismaProductMapper {
  static toDomain(raw: Prisma.ProductUncheckedCreateInput): Product {
    return Product.create(
      {
        name: raw.name,
        description: raw.description ?? null,
        price: raw.price,
        imageUrl: raw.imageUrl ?? null,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(product: Product): Prisma.ProductUncheckedCreateInput {
    return {
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
    }
  }
}
