import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET || "SECRET_KEY";
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("AUTH HEADER:", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Unauthorized (no bearer token)",
        });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, SECRET);
        console.log("DECODED:", decoded);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
};
