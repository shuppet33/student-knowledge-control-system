import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { authRouter } from './routes/auth.routes.js'
import { groupsRouter } from './routes/groups.routes.js'
import { subjectsRouter } from './routes/subjects.routes.js'
import { teachersRouter } from './routes/teachers.routes.js'
import { usersRouter } from './routes/users.routes.js'

const app = express()
const PORT = 3000

dotenv.config()

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }),
)
app.use(cookieParser())
app.use(express.json())

app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/groups', groupsRouter)
app.use('/subjects', subjectsRouter)
app.use('/teachers', teachersRouter)

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
