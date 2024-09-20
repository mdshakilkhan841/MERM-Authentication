import dotenv from "dotenv";
import { createTransport } from "nodemailer";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./mailTemplate.js";

dotenv.config();

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.SENDER_MAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const sendVerificationEmail = async (email, verificationToken) => {
  const recipients = [email];
  try {
    const response = await transporter.sendMail({
      from: `"MERN-Auth" <${process.env.SENDER_MAIL}>`,
      to: recipients, // list of receivers
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    });
  } catch (error) {
    console.log("🚀 ~ sendVerificationEmail ~ error:", error);
    throw new error("Error sending verification email:", error.message);
  }
};

const sendWelcomeEmail = async (email, name) => {
  const recipients = [email];
  try {
    const response = await transporter.sendMail({
      from: `"MERN-Auth" <${process.env.SENDER_MAIL}>`,
      to: recipients, // list of receivers
      subject: "Welcome to MERN-Auth",
      html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", name).replace(
        "{CLIENT_URL}",
        process.env.CLIENT_URL
      ),
    });
  } catch (error) {
    console.log("🚀 ~ sendVerificationEmail ~ error:", error.message);
    throw new error("Error sending welcome email:", error.message);
  }
};

const sendPasswordResetEmail = async (email, RESET_URL) => {
  const recipients = [email];
  try {
    const response = await transporter.sendMail({
      from: `"MERN-Auth" <${process.env.SENDER_MAIL}>`,
      to: recipients, // list of receivers
      subject: "Reset Your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{RESET_URL}", RESET_URL),
    });
  } catch (error) {
    console.log("🚀 ~ sendPasswordResetEmail ~ error:", error);
    throw new error("Error sending password reset email:", error.message);
  }
};

const sendPasswordResetSuccessEmail = async (email) => {
  const recipients = [email];
  try {
    const response = await transporter.sendMail({
      from: `"MERN-Auth" <${process.env.SENDER_MAIL}>`,
      to: recipients, // list of receivers
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
  } catch (error) {
    console.log("🚀 ~ sendPasswordResetSuccessEmail ~ error:", error);
    throw new error(
      "Error sending password reset success email:",
      error.message
    );
  }
};

export {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail,
};
