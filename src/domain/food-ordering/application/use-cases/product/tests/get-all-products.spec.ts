import { makeProducts } from 'test/factories/make-products'
import { ProductsInMemoryRepository } from 'test/repositories/products-in-memory-repository'

import { GetAllProductsUseCase } from '../get-all-products'

let productsRepository: ProductsInMemoryRepository
let sut: GetAllProductsUseCase

describe('Get all Products use case', () => {
  beforeEach(async () => {
    productsRepository = new ProductsInMemoryRepository()
    sut = new GetAllProductsUseCase(productsRepository)
  })
  it('should be able return a list of products', async () => {
    for (let i = 0; i < 10; i++) {
      const newProduct = makeProducts()

      await productsRepository.create(newProduct)
    }

    const result = await sut.execute()

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      const { products } = result.result

      expect(products).toHaveLength(10)
    }
  })
})
