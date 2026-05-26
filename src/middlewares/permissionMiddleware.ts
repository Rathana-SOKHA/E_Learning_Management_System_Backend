export const authorizePermissions = (...perms: string[]) => {
  return (req: any, res: any, next: any) => {
    const userPerms = req.user?.permissions || [];

    if (!Array.isArray(userPerms)) {
      return res.status(403).json({
        message: "Permissions not loaded",
      });
    }

    const ok = perms.every((p) =>
      userPerms.includes(p)
    );

    if (!ok) {
      return res.status(403).json({
        message: "Forbidden - No Permission",
      });
    }

    next();
  };
};