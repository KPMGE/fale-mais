import express from 'express'
import { env } from './config/env'
import { setupRoutes } from './config/routes'
import { pool } from '../infrastructure/repositories/postgres'
import cors from 'cors'


const app = express()

app.use(express.json())
app.use(cors({
  origin: '*'
}))

setupRoutes(app)

pool.connect()
  .then(() => {
    console.log('database connected!')
    app.listen(env.port, () => console.log(`Listening on port ${env.port}...`))
  })
  .catch(err => console.error(err))
