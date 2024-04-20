import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order, OrdersProps } from '@/domain/food-ordering/enterprise/entities/order'

export function makeOrder(override: Partial<OrdersProps> = {}, id?: UniqueEntityID) {
  return Order.create(
    {
      userId: faker.database.mongodbObjectId(),
      total: Number(faker.finance.amount()),
      ordersItemsId: faker.database.mongodbObjectId(),
      ...override,
    },
    id,
  )
}
