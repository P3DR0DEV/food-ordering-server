import { makeOrder } from 'test/factories/make-order'
import { OrderInMemoryRepository } from 'test/repositories/orders-in-memory-repository'

import { GetAllOrdersUseCase } from '../get-all-orders'

let orderRepository: OrderInMemoryRepository
let sut: GetAllOrdersUseCase

describe('Get all Orders use case', () => {
  beforeEach(async () => {
    orderRepository = new OrderInMemoryRepository()
    sut = new GetAllOrdersUseCase(orderRepository)
  })
  it('should be able return all orders', async () => {
    for (let i = 0; i < 10; i++) {
      const order = makeOrder()
      await orderRepository.create(order)
    }

    const result = await sut.execute()

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      const { orders } = result.result

      expect(orders).toHaveLength(10)
    }
  })
})
