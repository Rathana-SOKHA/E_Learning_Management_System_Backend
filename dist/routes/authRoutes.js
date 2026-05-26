import { Router } from "express";
import { AuthController } from "../controllers/AuthController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
const router = Router();
const controller = new AuthController();
// router.get(
//   "/profile",
//   authMiddleware,
//   (req, res) => {
//     res.json({
//       message: "Protected route",
//       user: (req as any).user,
//     });
//   }
// );
import { authorizePermissions } from "../middlewares/permissionMiddleware.js";
router.post("/create-course", authMiddleware, authorizePermissions("create_course"), (req, res) => {
    res.json({ message: "Course created" });
});
// Admin Route
router.get("/admin", authMiddleware, authorizeRoles("ADMIN"), (req, res) => {
    res.json({
        message: "Welcome Admin Page",
    });
});
// Teacher Route
router.get("/teacher", authMiddleware, authorizeRoles("TEACHER"), (req, res) => {
    res.json({
        message: "Welcome Teacher Page",
    });
});
// Student Route
router.get("/student", authMiddleware, authorizeRoles("STUDENT"), (req, res) => {
    res.json({
        message: "Welcome Student Page",
    });
});
router.post("/register", controller.register);
router.post("/login", controller.login);
export default router;
