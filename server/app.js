import express from 'express'
import dotenv from "dotenv";
import {authRouter} from "./routes/auth.routes.js";
import cors from 'cors'
import cookieParser from "cookie-parser";

const app = express()
const PORT = 3000

dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(cookieParser());
app.use(express.json())

app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})