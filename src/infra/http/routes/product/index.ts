import { FastifyInstance } from 'fastify'

import { createProduct } from './create-product'
import { deleteProduct } from './delete-product'
import { editProduct } from './edit-product'
import { getAllProducts } from './get-all-products'
import { getProductById } from './get-product-by-id'

export async function productsRoutes(app: FastifyInstance) {
  getAllProducts(app)
  getProductById(app)
  editProduct(app)
  deleteProduct(app)
  createProduct(app)
}
