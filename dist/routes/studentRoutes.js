import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { authorizePermissions } from "../middlewares/permissionMiddleware.js";
const router = Router();
router.get("/dashboard", authMiddleware, authorizeRoles("STUDENT"), (req, res) => {
    res.json({
        message: "Welcome Student Page",
    });
});
router.post("/enroll", authMiddleware, authorizePermissions("enroll_course"), (req, res) => {
    res.json({
        message: "Student enrolled successfully",
    });
});
export default router;
