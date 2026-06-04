
import { Router } from "express";
import { AuthController } from "../controllers/AuthController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();
const controller = new AuthController();

router.get("/users", controller.getAllUsers);
router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/logout", controller.logout);
router.get("/profile", authMiddleware, (req, res) => controller.getProfile(req, res));

export default router;

