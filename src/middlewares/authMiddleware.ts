import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: string;
        permissions: string[];
      };
    }
  }
}

const SECRET = process.env.JWT_SECRET || "SECRET_KEY";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Unauthorized", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET) as {
      id: number;
      role: string;
      permissions: string[];
    };

    req.user = decoded;

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
};
