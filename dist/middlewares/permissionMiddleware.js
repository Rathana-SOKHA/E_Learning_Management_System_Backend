export const authorizePermissions = (...perms) => {
    return (req, res, next) => {
        const userPerms = req.user?.permissions || [];
        if (!Array.isArray(userPerms)) {
            return res.status(403).json({
                message: "Permissions not loaded",
            });
        }
        const ok = perms.every((p) => userPerms.includes(p));
        if (!ok) {
            return res.status(403).json({
                message: "Forbidden - No Permission",
            });
        }
        next();
    };
};
