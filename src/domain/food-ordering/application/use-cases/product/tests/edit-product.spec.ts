import { makeProducts } from 'test/factories/make-products'
import { ProductsInMemoryRepository } from 'test/repositories/products-in-memory-repository'

import { NotFound } from '@/core/errors/not-found'

import { EditProductUseCase } from '../edit-product'

let productsRepository: ProductsInMemoryRepository
let sut: EditProductUseCase

describe('Edit User use case', () => {
  beforeEach(async () => {
    productsRepository = new ProductsInMemoryRepository()
    sut = new EditProductUseCase(productsRepository)
  })
  it('should be able to edit a user', async () => {
    const newProduct = makeProducts()
    const secondProduct = makeProducts()

    const previousName = newProduct.name

    await productsRepository.create(secondProduct)
    await productsRepository.create(newProduct)

    const result = await sut.execute({
      name: 'johndoe@example.com',
      id: newProduct.id.toString(),
      description: newProduct.description,
      imageUrl: newProduct.imageUrl,
      price: newProduct.price,
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      const { product } = result.result

      expect(product.name).toEqual(newProduct.name)
      expect(product.name === previousName).toBeFalsy()
    }

    const secondResult = await sut.execute({
      name: 'johndoe@example.com',
      id: 'any-id',
      description: secondProduct.description,
      imageUrl: secondProduct.imageUrl,
      price: secondProduct.price,
    })

    expect(secondResult.hasFailed()).toBeTruthy()

    if (secondResult.hasFailed()) {
      const { reason } = secondResult

      expect(reason).toBeInstanceOf(NotFound)
    }
  })
})
