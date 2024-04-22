import { PrismaClient } from '@prisma/client'

import { OrderItemsRepository } from '@/domain/food-ordering/application/repositories/order-items-repository'
import { OrderItems } from '@/domain/food-ordering/enterprise/entities/order-items'

import { PrismaOrderItemsMapper } from '../mappers/prisma-order-items-mapper'

export class PrismaOrderItemsRepository implements OrderItemsRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<OrderItems | null> {
    const orderItems = await this.prisma.orderItem.findUnique({ where: { id } })

    if (!orderItems) {
      return null
    }

    return PrismaOrderItemsMapper.toDomain(orderItems)
  }

  async findManyByOrderId(orderId: string): Promise<OrderItems[]> {
    const orderItems = await this.prisma.orderItem.findMany({ where: { orderId } })

    return orderItems.map(PrismaOrderItemsMapper.toDomain)
  }

  async create(orderItems: OrderItems): Promise<void> {
    const data = PrismaOrderItemsMapper.toPersistence(orderItems)

    await this.prisma.orderItem.create({ data })
  }
}
