import { Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/food-ordering/enterprise/entities/order'

export class PrismaOrderMapper {
  static toDomain(raw: Prisma.OrderUncheckedCreateInput): Order {
    return Order.create(
      {
        userId: raw.userId,
        status: raw.status,
        total: raw.total,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(order: Order): Prisma.OrderUncheckedCreateInput {
    return {
      id: order.id.toString(),
      userId: order.userId,
      status: order.status,
      total: order.total,
    }
  }
}
