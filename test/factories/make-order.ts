import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order, OrdersProps } from '@/domain/food-ordering/enterprise/entities/order'

import { makeOrderItems } from './make-order-items'

export function makeOrder(override: Partial<OrdersProps> = {}, id?: UniqueEntityID) {
  const newOrderItems = makeOrderItems()

  return Order.create(
    {
      userId: faker.database.mongodbObjectId(),
      total: Number(faker.finance.amount()),
      OrderItems: [newOrderItems],
      ...override,
    },
    id,
  )
}
