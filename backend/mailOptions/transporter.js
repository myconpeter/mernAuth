import nodemailer from 'nodemailer'

import dotenv from 'dotenv'

dotenv.config()


// nodemailer setup
// nodemailer setup

// Create a transporter using Gmail SMTP
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD
    }
});

transporter.verify((success, error)=>{
    success ? console.log(success): console.log(error)
})


// nodemailer setup


export default transporter