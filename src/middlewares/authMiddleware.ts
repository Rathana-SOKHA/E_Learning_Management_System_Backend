import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/generateToken.js";

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    console.log("✅ Decoded token:", decoded);

    req.user = decoded;

    next();
  } catch (err: any) {
    console.error("❌ Auth Error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};