import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.js";

export const authorizePermissions = (...perms: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userPerms = req.user?.permissions || [];

    if (!Array.isArray(userPerms)) {
      throw new AppError("Permissions not loaded", 403);
    }

    const ok = perms.every((p) => userPerms.includes(p));

    if (!ok) {
      throw new AppError("Forbidden - No Permission", 403);
    }

    next();
  };
};
