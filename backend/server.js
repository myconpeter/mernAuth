import express from 'express'
import dotenv from 'dotenv'


dotenv.config()

import userRoutes from './routes/userRoutes.js'

import { notFound, errorHandler } from './middleware/errorMiddle.js'

const port = process.env.Port || 8000

const app = express()


app.use('/api/users', userRoutes)
app.use(notFound)
app.use(errorHandler)
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => { console.log("connected to app on port " + port) })