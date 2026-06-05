import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js";
const SECRET = process.env.JWT_SECRET || "SECRET_KEY";
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError("Unauthorized", 401);
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    }
    catch {
        throw new AppError("Invalid token", 401);
    }
};
