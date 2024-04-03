import nodemailer from 'nodemailer';

import dotenv from 'dotenv'

dotenv.config()

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

// verify transpoter

transporter.verify((error, success) => {
    error ? console.log(error) : console.log(success)
})

export default transporter
