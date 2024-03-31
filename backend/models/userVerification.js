import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const userVerification = mongoose.Schema({
    userId : String,
    uniqueString : String,
    expiresAt : Date,


}, {timeStamps : true})


userVerification.pre('save', async function(next){
    if(!this.isModified('uniqueString')){
        next()
    }

    const salt = await bcrypt.genSalt(15)
    this.uniqueString = await bcrypt.hash(this.uniqueString, salt)
})

const UserVerification = mongoose.model('UserVerification', userVerification)

export default UserVerification