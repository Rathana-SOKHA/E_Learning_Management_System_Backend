import { Router } from "express";

import { QuizResultController } from "../controllers/QuizResultController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = Router();

const controller = new QuizResultController();

router.post(
  "/submit",
  authMiddleware,
  authorizeRoles("STUDENT"),
  controller.submitQuiz,
);

router.get(
  "/my-results",
  authMiddleware,
  authorizeRoles("STUDENT"),
  controller.getMyResults,
);

export default router;
