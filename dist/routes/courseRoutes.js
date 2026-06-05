import { Router } from "express";
import { CourseController } from "../controllers/CourseController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
const router = Router();
const controller = new CourseController();
// CREATE COURSE
router.post("/", authMiddleware, authorizeRoles("TEACHER"), controller.createCourse);
// GET ALL COURSES
router.get("/", controller.getCourses);
// GET ONE COURSE
router.get("/:id", controller.getCourseById);
// UPDATE COURSE
router.put("/:id", authMiddleware, authorizeRoles("TEACHER"), controller.updateCourse);
// DELETE COURSE
router.delete("/:id", authMiddleware, authorizeRoles("TEACHER"), controller.deleteCourse);
export default router;
