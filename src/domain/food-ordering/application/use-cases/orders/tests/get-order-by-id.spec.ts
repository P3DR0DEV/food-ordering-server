import { makeOrder } from 'test/factories/make-order'
import { OrderInMemoryRepository } from 'test/repositories/orders-in-memory-repository'

import { GetOrderByIdUseCase } from '../get-order-by-id'

let orderRepository: OrderInMemoryRepository
let sut: GetOrderByIdUseCase

describe('Get Order by id use case', () => {
  beforeEach(async () => {
    orderRepository = new OrderInMemoryRepository()
    sut = new GetOrderByIdUseCase(orderRepository)
  })

  it('should be able to get a order by id', async () => {
    const newOrder = makeOrder()

    await orderRepository.create(newOrder)

    const result = await sut.execute(newOrder.id.toString())

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      const { order } = result.result
      expect(order.id).toEqual(newOrder.id)

      expect(order.status).toEqual(newOrder.status)
    }
  })
})
