import express from 'express'
import { env } from './config/env'
import { setupRoutes } from './config/routes'

const app = express()
app.use(express.json())

setupRoutes(app)

app.listen(env.port, () => console.log(`Listening on port ${env.port}...`))
