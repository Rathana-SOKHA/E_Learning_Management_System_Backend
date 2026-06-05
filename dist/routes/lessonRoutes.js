import { Router } from "express";
import { LessonController } from "../controllers/LessonController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
const router = Router();
const controller = new LessonController();
// CREATE LESSON
router.post("/", authMiddleware, authorizeRoles("TEACHER"), controller.createLesson);
// GET ALL LESSONS
router.get("/", controller.getLessons);
// GET ONE LESSON
router.get("/:id", controller.getLessonById);
// UPDATE LESSON
router.put("/:id", authMiddleware, authorizeRoles("TEACHER"), controller.updateLesson);
// DELETE LESSON
router.delete("/:id", authMiddleware, authorizeRoles("TEACHER"), controller.deleteLesson);
export default router;
