import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OrderItems, OrderItemsProps } from '@/domain/food-ordering/enterprise/entities/order-items'

export function makeOrderItems(override: Partial<OrderItemsProps> = {}, id?: UniqueEntityID) {
  return OrderItems.create(
    {
      orderId: faker.database.mongodbObjectId(),
      productId: faker.database.mongodbObjectId(),
      quantity: Number(faker.finance.amount()),
      size: faker.helpers.arrayElement(['S', 'M', 'L', 'XL', 'XXL']),
      ...override,
    },
    id,
  )
}
