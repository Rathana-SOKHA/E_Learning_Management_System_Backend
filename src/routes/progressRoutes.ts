import { Router } from "express";

import { ProgressController } from "../controllers/ProgressController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = Router();

const controller =
  new ProgressController();

router.post(
  "/complete",
  authMiddleware,
  authorizeRoles("STUDENT"),
  controller.completeLesson
);

router.get(
  "/my-progress",
  authMiddleware,
  authorizeRoles("STUDENT"),
  controller.getMyProgress
);

export default router;