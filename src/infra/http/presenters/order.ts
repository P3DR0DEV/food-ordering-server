import { Order } from '@/domain/food-ordering/enterprise/entities/order'

export class OrderPresenter {
  static toHttpResponse(order: Order) {
    return {
      id: order.id.toString(),
      total: order.total,
      status: order.status,
      userId: order.userId,
      createdAt: order.createdAt.toISOString(),
      orderItems: order.orderItems,
    }
  }
}
