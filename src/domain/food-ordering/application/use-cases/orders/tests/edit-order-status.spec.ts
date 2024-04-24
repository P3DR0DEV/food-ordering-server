import { makeOrder } from 'test/factories/make-order'
import { OrderInMemoryRepository } from 'test/repositories/orders-in-memory-repository'

import { EditOrderStatusUseCase } from '../edit-order-status'

let orderRepository: OrderInMemoryRepository
let sut: EditOrderStatusUseCase

describe('edit Order status use case', () => {
  beforeEach(async () => {
    orderRepository = new OrderInMemoryRepository()
    sut = new EditOrderStatusUseCase(orderRepository)
  })
  it('should be able to edit a order status', async () => {
    const newOrder = makeOrder()
    await orderRepository.create(newOrder)

    const result = await sut.execute(newOrder.id.toString(), 'PREPARING')

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      const { order } = result.result

      expect(order.status).toEqual('PREPARING')
    }

    const erro = await sut.execute('random-id', 'PREPARING')

    expect(erro.hasFailed()).toBeTruthy()
  })
})
