import { makeOrderItems } from 'test/factories/make-order-items'
import { OrderItemsInMemoryRepository } from 'test/repositories/order-items-in-memory-repository'

import { GetAllOrderItemsByOrderIdUseCase } from '../get-all-by-order-id'

let orderItemsRepository: OrderItemsInMemoryRepository
let sut: GetAllOrderItemsByOrderIdUseCase

describe('Get all orders use case', () => {
  beforeEach(async () => {
    orderItemsRepository = new OrderItemsInMemoryRepository()
    sut = new GetAllOrderItemsByOrderIdUseCase(orderItemsRepository)
  })

  it('should be able return all orders', async () => {
    const newOrder = makeOrderItems()

    await orderItemsRepository.create(newOrder)

    const result = await sut.execute(newOrder.orderId.toString())

    expect(result.hasSucceeded()).toBeTruthy()
  })
})
