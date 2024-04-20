import { makeOrderItems } from 'test/factories/make-order-items'
import { OrderItemsInMemoryRepository } from 'test/repositories/order-items-in-memory-repository'

import { RegisterOrderItemsUseCase } from '../register'

let orderItemsRepository: OrderItemsInMemoryRepository
let sut: RegisterOrderItemsUseCase

describe('Register Order use case', () => {
  beforeEach(async () => {
    orderItemsRepository = new OrderItemsInMemoryRepository()
    sut = new RegisterOrderItemsUseCase(orderItemsRepository)
  })
  it('should be able to register an order', async () => {
    const newOrder = makeOrderItems()

    const result = await sut.execute(newOrder)

    expect(result.hasSucceeded()).toBeTruthy()

    expect(orderItemsRepository.items).toHaveLength(1)
  })
})
