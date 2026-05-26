// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { tokenBlacklist } from "../utils/tokenBlacklist.js";
import { JWT_SECRET } from "../utils/generateToken.js";


export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  // Special case: Allow logout even if token is blacklisted (but still validate it exists)
  if (req.path.includes('/logout')) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1] || authHeader;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    // Continue to controller even if blacklisted (so we can blacklist it again)
    req.token = token;
    return next();
  }

  // Normal protected routes
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1] || authHeader;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ message: "Token has been logged out" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    // Normalize to support payload { id } or { userId }
    const id = decoded?.id ?? decoded?.userId;
    if (!id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.user = {
      ...decoded,
      id,
      userId: decoded.userId ?? decoded.id,
    };


    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};