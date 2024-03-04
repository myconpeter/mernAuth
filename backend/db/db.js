import mongoose, { mongo } from 'mongoose'

const connectDB = async () => {
    try {
        const connect = mongoose.connect(process.env.MONGI_URI)
        console.log(`connected ot database ${connect.connection.host}`)
    } catch (error) {
        console.error(`Error ${error.message}`)
        process.exit(1)

    }

}


export default connectDB