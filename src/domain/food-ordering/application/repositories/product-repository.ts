import { Product } from '../../enterprise/entities/product'

export interface ProductsRepository {
  findById(id: string): Promise<Product | null>
  findMany(): Promise<Product[]>

  create(product: Product): Promise<void>
  save(product: Product): Promise<void>
  delete(id: string): Promise<void>
}
