import { makeProducts } from 'test/factories/make-products'
import { ProductsInMemoryRepository } from 'test/repositories/products-in-memory-repository'

import { DeleteProductUseCase } from '../delete-product'

let productsRepository: ProductsInMemoryRepository
let sut: DeleteProductUseCase

describe('Delete Product use case', () => {
  beforeEach(async () => {
    productsRepository = new ProductsInMemoryRepository()
    sut = new DeleteProductUseCase(productsRepository)
  })

  it('should be able to delete a product', async () => {
    const newProduct = makeProducts()

    await productsRepository.create(newProduct)

    const result = await sut.execute(newProduct.id.toString())

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(productsRepository.products).toHaveLength(0)
      const { message } = result.result

      expect(message).toEqual('Product deleted successfully')
    }
  })
})
