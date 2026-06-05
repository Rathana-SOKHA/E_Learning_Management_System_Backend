import { AppError } from "../utils/appError.js";
export const authorizeRoles = (...roles) => (req, res, next) => {
    if (!req.user) {
        throw new AppError("Unauthorized", 401);
    }
    if (!roles.includes(req.user.role)) {
        throw new AppError("Forbidden", 403);
    }
    next();
};
