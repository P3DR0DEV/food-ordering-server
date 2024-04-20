import { makeProducts } from 'test/factories/make-products'
import { ProductsInMemoryRepository } from 'test/repositories/products-in-memory-repository'

import { GetProductByIdUseCase } from '../get-product-by-id'

let productsRepository: ProductsInMemoryRepository
let sut: GetProductByIdUseCase

describe('Get Product By Id use case', () => {
  beforeEach(async () => {
    productsRepository = new ProductsInMemoryRepository()
    sut = new GetProductByIdUseCase(productsRepository)
  })

  it('should be able to get a single product by ID', async () => {
    const newProduct = makeProducts()

    await productsRepository.create(newProduct)

    const result = await sut.execute(newProduct.id.toString())

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      const { product } = result.result

      expect(product.id.toString()).toEqual(newProduct.id.toString())
    }
  })
})
