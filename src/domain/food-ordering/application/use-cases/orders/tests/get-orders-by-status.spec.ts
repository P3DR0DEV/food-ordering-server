import { makeOrder } from 'test/factories/make-order'
import { OrderInMemoryRepository } from 'test/repositories/orders-in-memory-repository'

import { EditOrderStatusUseCase } from '../edit-order-status'
import { GetOrdersByStatusUseCase } from '../get-orders-by-status'

let orderRepository: OrderInMemoryRepository
let sut: GetOrdersByStatusUseCase

describe('Get Orders by status use case', () => {
  beforeEach(async () => {
    orderRepository = new OrderInMemoryRepository()
    sut = new GetOrdersByStatusUseCase(orderRepository)
  })
  it('should be able to return a list of orders', async () => {
    for (let i = 0; i < 10; i++) {
      const order = makeOrder()
      await orderRepository.create(order)
    }

    const result = await sut.execute('DELIVERED')

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      const { orders } = result.result
      expect(orders).toHaveLength(0)
    }
    const toUpdate = new EditOrderStatusUseCase(orderRepository)
    await toUpdate.execute(orderRepository.items[0].id.toString(), 'DELIVERED')

    const result2 = await sut.execute('DELIVERED')

    expect(result2.hasSucceeded()).toBeTruthy()

    if (result2.hasSucceeded()) {
      const { orders } = result2.result
      expect(orders).toHaveLength(1)
    }
  })
})
