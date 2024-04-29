import fastifyCors from '@fastify/cors'
import jwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

import { env } from '@/env'

import { errorHandler } from './error-handler'
import { ordersRoutes, productsRoutes, signIn, usersRoutes } from './routes'

const app = fastify({ logger: { level: 'warn' } })

// ! Fastify TypeProviderZod config to type routes inputs and outputs
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// ! Fastify Swagger config
app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'food-ordering',
      description: 'food-ordering API documentation',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.register(fastifyCors, {
  origin: '*',
})

app.register(jwt, {
  secret: 'food-ordering',
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '7d',
  },
})

app.register(signIn)
app.register(usersRoutes)
app.register(productsRoutes)
app.register(ordersRoutes)

app.setErrorHandler(errorHandler)

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('[server] HTTP server listening on port 3333')
})
