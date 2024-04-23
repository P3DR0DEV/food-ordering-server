import { FastifyInstance } from 'fastify'

import { createUserRoute } from './create-user'
import { deleteUserRoute } from './delete-user'
import { editUserRoute } from './edit-user'
import { getUserByEmailRoute } from './get-user-by-email'
import { getUserByIdRoute } from './get-user-by-id'
import { getUsersRoute } from './get-users'

export async function usersRoutes(app: FastifyInstance) {
  app.register(createUserRoute)
  app.register(getUsersRoute)
  app.register(getUserByIdRoute)
  app.register(editUserRoute)
  app.register(getUserByEmailRoute)
  app.register(deleteUserRoute)
}
