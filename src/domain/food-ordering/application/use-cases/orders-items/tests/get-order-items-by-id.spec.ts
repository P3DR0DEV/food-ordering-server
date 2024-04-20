import { makeOrderItems } from 'test/factories/make-order-items'
import { OrderItemsInMemoryRepository } from 'test/repositories/order-items-in-memory-repository'

import { GetOrderItemsByIdUseCase } from '../get-order-items-by-id'

let orderItemsRepository: OrderItemsInMemoryRepository
let sut: GetOrderItemsByIdUseCase

describe('Get orders items use case', () => {
  beforeEach(async () => {
    orderItemsRepository = new OrderItemsInMemoryRepository()
    sut = new GetOrderItemsByIdUseCase(orderItemsRepository)
  })
  it('should be able return order items', async () => {
    const newOrder = makeOrderItems()

    await orderItemsRepository.create(newOrder)

    const result = await sut.execute(newOrder.id.toString())

    expect(result.hasSucceeded()).toBeTruthy()
  })
})
