import { PrismaClient } from '@prisma/client'

import { ProductsRepository } from '@/domain/food-ordering/application/repositories/product-repository'
import { Product } from '@/domain/food-ordering/enterprise/entities/product'

import { PrismaProductMapper } from '../mappers/prisma-products-mapper'

export class PrismaProductRepository implements ProductsRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({ where: { id } })

    if (!product) {
      return null
    }

    return PrismaProductMapper.toDomain(product)
  }

  async findMany(): Promise<Product[]> {
    const products = await this.prisma.product.findMany()

    return products.map(PrismaProductMapper.toDomain)
  }

  async create(product: Product): Promise<void> {
    const data = PrismaProductMapper.toPersistence(product)

    await this.prisma.product.create({ data })
  }

  async save(product: Product): Promise<void> {
    const data = PrismaProductMapper.toPersistence(product)

    await this.prisma.product.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } })
  }
}
