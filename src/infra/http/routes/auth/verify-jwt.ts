import fastifyPlugin from 'fastify-plugin'

import { Unauthorized } from '../_errors/unauthorized'

export const auth = fastifyPlugin(async (app) => {
  app.addHook('preHandler', async (request) => {
    try {
      await request.jwtVerify()
    } catch {
      throw new Unauthorized('Invalid token')
    }
  })
})
