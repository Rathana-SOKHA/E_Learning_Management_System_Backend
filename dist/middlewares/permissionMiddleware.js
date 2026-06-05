import { AppError } from "../utils/appError.js";
export const authorizePermissions = (...perms) => {
    return (req, res, next) => {
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
