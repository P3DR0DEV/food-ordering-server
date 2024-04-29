import { PrismaClient } from '@prisma/client'

import { OrderRepository } from '@/domain/food-ordering/application/repositories/order-repository'
import { Order } from '@/domain/food-ordering/enterprise/entities/order'
import { OrderStatusMapper } from '@/infra/util/order-status-mapper'

import { PrismaOrderMapper } from '../mappers/prisma-orders-mapper'

export class PrismaOrderRepository implements OrderRepository {
  constructor(private prisma: PrismaClient) {}

  async findMany(opt?: 'new' | 'preparing' | 'delivering' | 'delivered' | 'cancelled'): Promise<Order[]> {
    const status = OrderStatusMapper.toPersistence(opt)

    const orders = await this.prisma.order.findMany({ where: { status }, include: { orderItem: true } })

    return orders.map(PrismaOrderMapper.toDomain)
  }

  async findManyByUserId(userId: string): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      include: { orderItem: true },
    })

    return orders.map(PrismaOrderMapper.toDomain)
  }

  async updateStatus(
    orderId: string,
    opt: 'preparing' | 'delivering' | 'delivered' | 'cancelled',
  ): Promise<Order | null> {
    const status = OrderStatusMapper.toPersistence(opt)

    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: { orderItem: true },
    })

    if (!order) {
      return null
    }

    return PrismaOrderMapper.toDomain(order)
  }

  async findById(id: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { orderItem: true },
    })

    if (!order) {
      return null
    }

    return PrismaOrderMapper.toDomain(order)
  }

  async create(order: Order): Promise<void> {
    const data = PrismaOrderMapper.toPersistence(order)

    await this.prisma.order.create({
      data: {
        id: data.id,
        userId: data.userId,
        total: data.total,
        status: data.status,
        orderItem: {
          createMany: {
            data: data.orderItem,
          },
        },
      },
    })
  }
}
