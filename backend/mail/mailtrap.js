import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./mailTemplate.js";

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

const sendPasswordResetEmail = async (email, resetURL) => {
    const recipients = [{ email: email }];
    try {
        const response = await client.send({
            from: sender,
            to: recipients,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset Request",
        })
        console.log("🚀 ~ sendPasswordResetEmail ~ response:", response)
    } catch (error) {
        console.log("🚀 ~ sendPasswordResetEmail ~ error:", error)
        throw new error("Error sending password reset email:", error.message)
    }
}

const sendPasswordResetSuccessEmail = async (email) => {
    const recipients = [{ email: email }];
    try {
        const response = await client.send({
            from: sender,
            to: recipients,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset Successful",
        })
        console.log("🚀 ~ sendPasswordResetSuccessEmail ~ response:", response)
    } catch (error) {
        console.log("🚀 ~ sendPasswordResetSuccessEmail ~ error:", error)
        throw new error("Error sending password reset success email:", error.message)
    }
}

export { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendPasswordResetSuccessEmail };
