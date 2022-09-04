import express from 'express'
import { env } from './config/env'
import { setupRoutes } from './config/routes'
import cors from 'cors'
import { setupPostgresDb } from './config/postgres'

const app = express()

app.use(express.json())
app.use(cors({
  origin: '*'
}))

setupRoutes(app)

// setup postgres database and start server
setupPostgresDb()
  .then(() => {
    app.listen(env.port, () => console.log(`Listening on port ${env.port}...`))
  })
  .catch(err => console.error(err))
