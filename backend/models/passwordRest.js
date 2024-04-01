import mongoose from "mongoose";
import bcrypt, { genSalt } from 'bcrypt'


const confirmPassword = mongoose.Schema({
    userId : String,
    resetString:String,
    expiresAt: String,
    

},{timestamps: true})


//hashing of user string
confirmPassword.pre('save', async function(next){
    if(!this.modified('resetString')){
        next
    }
    const salt = await bcrypt.genSalt(12)
    this.resetString = await bcrypt.hash(this.resetString ,salt)
    
})




const ConfirmPassword = mongoose.model('ConfirmPassword', confirmPassword)

export default ConfirmPassword