import { makeOrder } from 'test/factories/make-order'
import { OrderInMemoryRepository } from 'test/repositories/orders-in-memory-repository'

import { RegisterOrderUseCase } from '../register'

let orderRepository: OrderInMemoryRepository
let sut: RegisterOrderUseCase

describe('Register Order use case', () => {
  beforeEach(async () => {
    orderRepository = new OrderInMemoryRepository()
    sut = new RegisterOrderUseCase(orderRepository)
  })
  it('should be able to register an order', async () => {
    const newOrder = makeOrder()

    const result = await sut.execute(newOrder)

    expect(result.hasSucceeded()).toBeTruthy()

    expect(orderRepository.items).toHaveLength(1)
  })
})
