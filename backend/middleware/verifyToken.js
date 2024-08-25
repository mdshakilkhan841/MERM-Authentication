import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
            if (error) return res.status(401).json({ success: false, message: "Invalid Token" });

            req.userId = user.userId;
            next();
        });
    } catch (error) {
        console.log("🚀 ~ verifyToken ~ error:", error);
        res.status(401).json({ success: false, message: "Server Error" });
    }
}