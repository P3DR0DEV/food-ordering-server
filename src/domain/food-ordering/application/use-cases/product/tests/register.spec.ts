import { makeProducts } from 'test/factories/make-products'
import { ProductsInMemoryRepository } from 'test/repositories/products-in-memory-repository'

import { RegisterProductUseCase } from '../register'

let productsRepository: ProductsInMemoryRepository
let sut: RegisterProductUseCase

describe('Register Product use case', () => {
  beforeEach(async () => {
    productsRepository = new ProductsInMemoryRepository()
    sut = new RegisterProductUseCase(productsRepository)
  })
  it('should be able to register a product', async () => {
    const newProduct = makeProducts({
      name: 'Product 1',
    })

    const result = await sut.execute(newProduct)

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(productsRepository.products).toHaveLength(1)

      const { product } = result.result

      expect(product.name).toEqual('Product 1')
    }
  })
})
