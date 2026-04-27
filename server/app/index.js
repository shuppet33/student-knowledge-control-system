
import express from 'express'
import {db} from "../db/connect.js";

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})
//проверка подключения
const result = await db.query('SELECT 1')
console.log(result)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})