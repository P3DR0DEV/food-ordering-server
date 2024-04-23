import { FastifyInstance } from 'fastify'

import { createOrder } from './create-order'
import { editOrderStatus } from './edit-order-status'
import { getAllOrders } from './get-all-orders'
import { getOrderByUserId } from './get-by-user-id'
import { getOrderById } from './get-order-by-id'

export async function ordersRoutes(app: FastifyInstance) {
  createOrder(app)
  editOrderStatus(app)
  getAllOrders(app)
  getOrderByUserId(app)
  getOrderById(app)
}
