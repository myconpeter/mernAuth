import { v4 as uuidv4 } from 'uuid';
import ConfirmPassword from '../models/passwordReset.js';
import transporter from './transporter.js'


const resetLink = async ({ _id, email }, res) => {
    // console.log(`${_id}, ${email}`)
    const currentUrl = 'https://mernauth-p168.onrender.com'; // Replace with your website URL
    const resetString = uuidv4() + _id
    const activationLink = `${currentUrl}/getPassword/${_id}/${resetString}`;


    const mailDetails = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: 'PASSWORD RESET',
        html: `
            <html>
                <head>
                    <style>
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            font-family: Arial, sans-serif;
                            border: 1px solid #ccc;
                            border-radius: 10px;
                        }
                        .logo {
                            display: block;
                            margin: 0 auto;
                            width: 200px;
                        }
                        .button {
                            display: inline-block;
                            padding: 10px 20px;
                            background-color: #007bff;
                            color: #fff;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <img src="https://th.bing.com/th?id=ORMS.74c6b9abdf846c014d655f55151c47bb&pid=Wdp&w=300&h=156&qlt=90&c=1&rs=1&dpr=1&p=0" alt="Company Logo" class="logo">
                        <h2>RESET UR PASSWORD !</h2>
                        <p>Please RESET  your PASSWORD account.</p>
                        <a href="${activationLink}" class="button">RESET Password</a>
                    </div>
                </body>
            </html>
        `
    }

    const createNewPass = ConfirmPassword.create({
        userId: _id,
        resetString,
        expiresAt: Date.now() + (5 * 60 * 60 * 1000)
    })

    if (createNewPass) {
        const sendMail = transporter.sendMail(mailDetails)

        if (sendMail) {
            res.status(200).json({
                status: 'pending',
                message: 'check your mail'
            })
        } else {
            res.status(400)
            throw new Error('Failed to send mail')

        }


    } else {
        res.status(401)
        throw new Error('Creation of password link failed')
    }



}


export default resetLink