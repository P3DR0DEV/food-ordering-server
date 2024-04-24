import { makeOrder } from 'test/factories/make-order'
import { OrderItemsInMemoryRepository } from 'test/repositories/order-items-in-memory-repository'
import { OrderInMemoryRepository } from 'test/repositories/orders-in-memory-repository'

import { RegisterOrderUseCase } from '../register'

let orderRepository: OrderInMemoryRepository
let orderItemsRepository: OrderItemsInMemoryRepository
let sut: RegisterOrderUseCase

describe('Register Order use case', () => {
  beforeEach(async () => {
    orderRepository = new OrderInMemoryRepository()
    orderItemsRepository = new OrderItemsInMemoryRepository()
    sut = new RegisterOrderUseCase(orderRepository, orderItemsRepository)
  })
  it('should be able to register an order', async () => {
    const newOrder = makeOrder()

    const result = await sut.execute(newOrder)

    expect(result.hasSucceeded()).toBeTruthy()

    expect(orderRepository.items).toHaveLength(1)
  })
})
