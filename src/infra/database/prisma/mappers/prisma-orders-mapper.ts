import { Order as PrismaOrder, OrderItem as PrismaOrderItem } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/food-ordering/enterprise/entities/order'
import { OrderItems } from '@/domain/food-ordering/enterprise/entities/order-items'

interface PrismaOrderWithItems extends PrismaOrder {
  orderItem: PrismaOrderItem[]
}

export class PrismaOrderMapper {
  static toDomain(raw: PrismaOrderWithItems): Order {
    const items = raw.orderItem.map((item) => {
      return OrderItems.create(
        {
          orderId: item.orderId,
          productId: item.productId,
          size: item.size,
          quantity: item.quantity,
        },
        new UniqueEntityID(item.id),
      )
    })

    return Order.create(
      {
        userId: raw.userId,
        status: raw.status,
        total: raw.total,
        orderItems: items,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(order: Order): PrismaOrderWithItems {
    return {
      id: order.id.toString(),
      userId: order.userId,
      status: order.status,
      total: order.total,
      orderItem: order.orderItems.map((item) => {
        return {
          id: item.id.toString(),
          orderId: item.orderId,
          productId: item.productId,
          size: item.size,
          quantity: item.quantity,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt ?? new Date(),
        }
      }),
    }
  }
}
