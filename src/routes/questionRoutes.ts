import { Router } from "express";

import { QuestionController } from "../controllers/QuestionController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = Router();

const controller = new QuestionController();

// CREATE QUESTION
router.post(
  "/",
  authMiddleware,
  authorizeRoles("TEACHER"),
  controller.createQuestion,
);

// GET ALL QUESTIONS
router.get("/", controller.getQuestions);

// GET ONE QUESTION
router.get("/:id", controller.getQuestionById);

// UPDATE QUESTION
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("TEACHER"),
  controller.updateQuestion,
);

// DELETE QUESTION
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("TEACHER"),
  controller.deleteQuestion,
);

export default router;
