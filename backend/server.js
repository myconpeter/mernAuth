import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
// import connectDB from './db/db.js'


dotenv.config()
// connectDB()

import userRoutes from './routes/userRoutes.js'

import { notFound, errorHandler } from './middleware/errorMiddle.js'

const port = process.env.Port || 8000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/users', userRoutes)
app.use(notFound)
app.use(errorHandler)

app.get('/', (req, res) => res.send('Hello World!'))


// MONGOOSE CONNECTION

let mongoURI = '';
if (process.env.NODE_ENV === 'local') {
    mongoURI = process.env.MONGO_URI_LOCAL;
    console.log('Running in local environment');
} else if (process.env.NODE_ENV === 'production') {
    mongoURI = process.env.MONGO_URI_PROD;
    console.log('Running in production environment');
} else {
    console.log('Environment not set correctly');
}

mongoose.connect(mongoURI)
    .then(() => {

        app.listen(process.env.PORT, () => {
            console.log(`connected to port: ${port} and to ${mongoURI}`)
        })
    })
    .catch(err => console.log(err));




