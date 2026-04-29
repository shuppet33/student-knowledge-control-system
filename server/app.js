import express from 'express'
import dotenv from "dotenv";
import {authRouter} from "./routes/auth.routes.js";
import cors from 'cors'

const app = express()
const PORT = 3000

dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(express.json())

app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})