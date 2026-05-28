import { Router } from "express";

import { QuizController } from "../controllers/QuizController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = Router();

const controller =
  new QuizController();

// CREATE QUIZ
router.post(
  "/",
  authMiddleware,
  authorizeRoles("TEACHER"),
  controller.createQuiz
);

// GET ALL QUIZZES
router.get(
  "/",
  controller.getQuizzes
);

// GET ONE QUIZ
router.get(
  "/:id",
  controller.getQuizById
);

// UPDATE QUIZ
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("TEACHER"),
  controller.updateQuiz
);

// DELETE QUIZ
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("TEACHER"),
  controller.deleteQuiz
);

export default router;