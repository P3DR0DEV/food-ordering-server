import { makeOrder } from 'test/factories/make-order'
import { OrderInMemoryRepository } from 'test/repositories/orders-in-memory-repository'

import { GetOrdersByUserIdUseCase } from '../get-orders-by-user-id'

let orderRepository: OrderInMemoryRepository
let sut: GetOrdersByUserIdUseCase

describe('Get Orders by user use case', () => {
  beforeEach(async () => {
    orderRepository = new OrderInMemoryRepository()
    sut = new GetOrdersByUserIdUseCase(orderRepository)
  })
  it('should be able to return a list of orders by user', async () => {
    for (let i = 0; i < 10; i++) {
      const order = makeOrder()
      await orderRepository.create(order)
    }
    const newOrder = makeOrder({ userId: 'user-1' })
    await orderRepository.create(newOrder)
    const result = await sut.execute('user-1')

    expect(orderRepository.items).toHaveLength(11)

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      const { orders } = result.result
      expect(orders).toHaveLength(1)
    }
  })
})
