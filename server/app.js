import { readFileSync } from 'node:fs'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yaml'

import { adminRouter } from './routes/admin.routes.js'
import { authRouter } from './routes/auth.routes.js'

const app = express()
const PORT = 3000

dotenv.config()

const openapiDocument = YAML.parse(
    readFileSync(new URL('./docs/openapi.yaml', import.meta.url), 'utf8'),
)

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }),
)
app.use(cookieParser())
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument))

app.use('/auth', authRouter)
app.use('/admin', adminRouter)

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
