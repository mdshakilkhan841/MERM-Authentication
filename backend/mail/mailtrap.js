import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./mailTemplate.js";
dotenv.config();

const client = new MailtrapClient({ endpoint: process.env.MAILTRAP_ENDPOINT, token: process.env.MAILTRAP_TOKEN });

const sender = {
    email: "mailtrap@demomailtrap.com",
    name: "MERN-Auth",
};

const sendVerificationEmail = async (email, verificationToken) => {
    const recipients = [{ email: email }];
    try {
        const response = await client.send({
            from: sender,
            to: recipients,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        })
        console.log("🚀 ~ sendVerificationEmail ~ response:", response)
    } catch (error) {
        console.log("🚀 ~ sendVerificationEmail ~ error:", error);
        throw new error("Error sending verification email:", error.message)
    }
}

const sendWelcomeEmail = async (email, name) => {
    const recipients = [{ email: email }];
    try {
        const response = await client.send({
            from: sender,
            to: recipients,
            subject: "Welcome to MERN-Auth",
            html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", name),
            category: "Welcome Email",
        })
        console.log("🚀 ~ sendVerificationEmail ~ response:", response);
    } catch (error) {
        console.log("🚀 ~ sendVerificationEmail ~ error:", error);
        throw new error("Error sending welcome email:", error.message)
    }
}

export { sendVerificationEmail, sendWelcomeEmail };
