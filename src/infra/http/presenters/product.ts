import { Product } from '@/domain/food-ordering/enterprise/entities/product'

export class ProductPresenter {
  static toHttpResponse(product: Product) {
    return {
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,
    }
  }
}
