import { FastifyInstance } from 'fastify'

import { deleteUserRoute } from './delete-user'
import { editUserRoute } from './edit-user'
import { getUserByEmailRoute } from './get-user-by-email'
import { getUserByIdRoute } from './get-user-by-id'
import { getUsersRoute } from './get-users'
import { meRoute } from './me'

export async function usersRoutes(app: FastifyInstance) {
  app.register(meRoute)
  app.register(getUsersRoute)
  app.register(getUserByIdRoute)
  app.register(editUserRoute)
  app.register(getUserByEmailRoute)
  app.register(deleteUserRoute)
}
