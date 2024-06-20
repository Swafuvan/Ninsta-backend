import dotenv from 'dotenv';
dotenv.config()
import  * as nodemailer from "nodemailer";


export function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}


const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendOtpEmail(to: any, otp: any) {
    // Send mail with defined transport object
     const info = await transporter.sendMail({
        from: 'Ninsta@gmail.com', // sender address
        to: to, // list of receivers
        subject: "Your OTP Code", // Subject line
        text: `Your OTP code is: ${otp}`, // plain text body
        html: `<b>Your OTP code is: ${otp}</b>`, // html body
    });
    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    

}
