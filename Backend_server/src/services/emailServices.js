import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmailNotification = async (recipient, subject, message, isHtml = false) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // Use `true` for port 465, `false` for port 587
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });


        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: recipient,
            subject: subject,
            html: isHtml ? message : undefined, // Send HTML if specified
            text: !isHtml ? message : undefined, // Fallback to plain text if not HTML
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${recipient}`);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export default sendEmailNotification;
