import { ProductRepository } from '@/domain/food-ordering/application/repositories/product-repository'
import { Product } from '@/domain/food-ordering/enterprise/entities/product'

export class ProductsImMemoryRepository implements ProductRepository {
  private products: Product[] = []

  async create(product: Product): Promise<void> {
    this.products.push(product)
  }

  async save(product: Product): Promise<void> {
    const index = this.products.findIndex((_product) => _product.id.toString() === product.id.toString())

    this.products[index] = product
  }

  async delete(id: string): Promise<void> {
    const index = this.products.findIndex((product) => product.id.toString() === id)

    this.products.splice(index, 1)
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find((product) => product.id.toString() === id)

    if (!product) {
      return null
    }

    return product
  }

  async findMany(): Promise<Product[]> {
    return this.products
  }
}
