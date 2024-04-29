import { PrismaClient } from '@prisma/client'

import { OrderRepository } from '@/domain/food-ordering/application/repositories/order-repository'
import { Order } from '@/domain/food-ordering/enterprise/entities/order'

import { PrismaOrderMapper } from '../mappers/prisma-orders-mapper'

export class PrismaOrderRepository implements OrderRepository {
  constructor(private prisma: PrismaClient) {}

  async findMany(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({ include: { orderItem: true } })

    return orders.map(PrismaOrderMapper.toDomain)
  }

  async findManyByUserId(userId: string): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      include: { orderItem: true },
    })

    return orders.map(PrismaOrderMapper.toDomain)
  }

  async findManyByStatus(status: 'NEW' | 'PREPARING' | 'DELIVERING' | 'DELIVERED' | 'CANCELLED'): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { status },
      include: { orderItem: true },
    })

    return orders.map(PrismaOrderMapper.toDomain)
  }

  async updateStatus(
    orderId: string,
    status: 'PREPARING' | 'DELIVERING' | 'DELIVERED' | 'CANCELLED',
  ): Promise<Order | null> {
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
