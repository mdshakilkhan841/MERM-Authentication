import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mail/mailtrap.js";

const signup = async (req, res) => {
    console.log("🚀 ~ signup ~ req:", req.body)
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

        await user.save();

        //JWT Token
        generateTokenAndSetCookie(res, user._id);
        // Send verification email
        await sendVerificationEmail(user.email, user.verificationToken);

        res.status(201).json({ success: true, message: "User created successfully", user: { ...user._doc, password: undefined } });
    } catch (error) {
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

        await user.save();

        //Send Welcome Email
        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({ success: true, message: "Email verified successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const login = async (req, res) => {
    res.send("Login Route");
}

const logout = async (req, res) => {
    res.send("Logout Route");
}

export { signup, login, logout, verifyEmail }