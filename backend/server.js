import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import path from 'path'

import { verifyEmail } from './controllers/userSignUpAndConfirm.js'

// import connectDB from './db/db.js'


dotenv.config()
// connectDB()

import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddle.js'
const port = process.env.PORT || 8000
const app = express()

// deployment

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve()
    app.use(express.static(path.join(__dirname, 'frontend/dist')))


    app.get('/verify/:userId/:uniqueString', verifyEmail)

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
    console.log('joining')

} else {
    app.get('/verify/:userId/:uniqueString', verifyEmail)
    app.get('/', (req, res) => res.send('Server is ready!'))
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api/users', userRoutes)
app.use(notFound)
app.use(errorHandler)












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




