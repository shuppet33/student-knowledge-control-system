import express from 'express'
import {db} from "../db/connect.js";
import dotenv from "dotenv";

const app = express()
const port = 3000

dotenv.config();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const result = await db.query('SELECT 1')
console.log(result.rows[0])

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})