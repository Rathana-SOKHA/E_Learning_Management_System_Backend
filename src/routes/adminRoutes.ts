import { Router, type Request, type Response } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { AuthController } from "../controllers/AuthController.js";

const router = Router();
const controller = new AuthController();

router.get(
  "/dashboard",
  authMiddleware,
  authorizeRoles("ADMIN"),
  (req: Request, res: Response) => {
    res.json({
      message: "Welcome Admin Page",
    });
  }
);

router.get(
  "/users",
  authMiddleware,
  authorizeRoles("ADMIN"),
  (req: Request, res: Response) => controller.getAllUsers(req, res)
);


export default router;