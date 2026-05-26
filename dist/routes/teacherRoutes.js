import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { authorizePermissions } from "../middlewares/permissionMiddleware.js";
import { CourseController } from "../controllers/CourseController.js";
const router = Router();
const controller = new CourseController();
// ➕ create course (teacher only)
router.post("/", authMiddleware, authorizePermissions("create_course"), controller.create);
// 📚 get all courses (public or protected)
router.get("/", controller.getAll);
router.get("/dashboard", authMiddleware, authorizeRoles("TEACHER"), (req, res) => {
    res.json({
        message: "Welcome Teacher Page",
    });
});
router.post("/create-course", authMiddleware, authorizePermissions("create_course"), (req, res) => {
    res.json({
        message: "Course created",
    });
});
export default router;
