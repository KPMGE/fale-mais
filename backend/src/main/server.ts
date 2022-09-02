import express from 'express'
import { env } from './config/env'
import { setupRoutes } from './config/routes'
import { pool } from '../infrastructure/repositories/postgres'

const app = express()
app.use(express.json())

setupRoutes(app)

pool.connect()
  .then(() => console.log('database connected!'))
  .catch(err => console.error(err))

app.listen(env.port, () => console.log(`Listening on port ${env.port}...`))

