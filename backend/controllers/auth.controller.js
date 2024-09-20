import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendPasswordResetEmail, sendPasswordResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mail/sendMail.js";

const signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        if (!email || !password || !name) {
            throw new Error("All fields are required");
        }

        const userAlreadyExist = await User.findOne({ email });
        if (userAlreadyExist) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000 //24 hours
        });

        // Send verification email
        await sendVerificationEmail(user.email, user.verificationToken);

        await user.save();

        //JWT Token
        generateTokenAndSetCookie(res, user._id);


        res.status(201).json({ success: true, message: "User created successfully", user: { ...user._doc, password: undefined } });
    } catch (error) {
        console.log("🚀 ~ signup ~ error:", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.body;
    try {
        const user = await User.findOne({ verificationToken, verificationTokenExpireAt: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or Expired verification token" });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpireAt = undefined;

        //Send Welcome Email
        await sendWelcomeEmail(user.email, user.name);
        
        await user.save();

        res.status(200).json({ success: true, message: "Email verified successfully", user: { ...user._doc, password: undefined } });
    } catch (error) {
        console.log("🚀 ~ verifyEmail ~ error:", error)
        res.status(400).json({ success: false, message: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid credentials" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        generateTokenAndSetCookie(res, user._id);
        user.lastLogin = Date.now();

        await user.save();

        res.status(200).json({ success: true, message: "Login successful", user: { ...user._doc, password: undefined } });
    } catch (error) {
        console.log("🚀 ~ login ~ error:", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ success: true, message: "Logout successfully" });
    } catch (error) {
        console.log("🚀 ~ logout ~ error:", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        //Generate Reset Token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpireAt = Date.now() + 1 * 60 * 60 * 1000 // 1h

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpireAt = resetTokenExpireAt;
        
        //Send password reset email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        
        await user.save();
        
        res.status(200).json({ success: true, message: "If an account exists for the email you entered, you will receive a password reset link shortly." });
    } catch (error) {
        console.log("🚀 ~ forgotPassword ~ error:", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { resetToken } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: resetToken,
            resetPasswordExpireAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or Expired reset token" });
        }

        //Update Password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpireAt = undefined;

        //Send password reset success email
        await sendPasswordResetSuccessEmail(user.email);
        
        await user.save();
        
        res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        console.log("🚀 ~ resetPassword ~ error:", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user: { ...user._doc, password: undefined } });
    } catch (error) {
        console.log("🚀 ~ checkAuth ~ error:", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

export { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth };