import { Router } from "express";

import { EnrollmentController } from "../controllers/EnrollmentController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = Router();

const controller =
  new EnrollmentController();

router.post(
  "/",
  authMiddleware,
  authorizeRoles("STUDENT"),
  controller.enrollCourse
);

export default router;