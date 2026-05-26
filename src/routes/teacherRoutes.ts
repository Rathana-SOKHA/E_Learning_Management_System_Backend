import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { authorizePermissions } from "../middlewares/permissionMiddleware.js";

const router = Router();

router.get(
  "/dashboard",
  authMiddleware,
  authorizeRoles("TEACHER"),
  (req, res) => {
    res.json({
      message: "Welcome Teacher Page",
    });
  }
);

router.post(
  "/create-course",
  authMiddleware,
  authorizePermissions("create_course"),
  (req, res) => {
    res.json({
      message: "Course created",
    });
  }
);

export default router;