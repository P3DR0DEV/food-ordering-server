import { FastifyInstance } from 'fastify'

import { createUserRoute } from './create-user'
import { deleteUserRoute } from './delete-user'
import { editUserRoute } from './edit-user'
import { getUserByIdRoute } from './get-user-by-email'
import { getUsersRoute } from './get-users'

export async function usersRoutes(app: FastifyInstance) {
  app.register(createUserRoute)
  app.register(getUsersRoute)
  app.register(getUserByIdRoute)
  app.register(editUserRoute)
  app.register(deleteUserRoute)
}
