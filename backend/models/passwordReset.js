import mongoose from "mongoose";
import bcrypt from 'bcrypt'


const confirmPassword = mongoose.Schema({
    userId: String,
    resetString: String,
    expiresAt: Date,


}, { timestamps: true })


//hashing of user string
confirmPassword.pre('save', async function (next) {
    if (!this.isModified('resetString')) {
        next
    }
    const salt = await bcrypt.genSalt(12)
    this.resetString = await bcrypt.hash(this.resetString, salt)

})




const ConfirmPassword = mongoose.model('ConfirmPassword', confirmPassword)

export default ConfirmPassword