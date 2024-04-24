import { Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OrderItems } from '@/domain/food-ordering/enterprise/entities/order-items'

export class PrismaOrderItemsMapper {
  static toPersistence(orderItem: OrderItems): Prisma.OrderItemUncheckedCreateInput {
    return {
      id: orderItem.id.toString(),
      orderId: orderItem.orderId.toString(),
      productId: orderItem.productId.toString(),
      quantity: orderItem.quantity,
      size: orderItem.size,
    }
  }

  static toDomain(raw: Prisma.OrderItemUncheckedCreateInput): OrderItems {
    return OrderItems.create(
      {
        orderId: raw.orderId,
        productId: raw.productId,
        quantity: raw.quantity,
        size: raw.size,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
