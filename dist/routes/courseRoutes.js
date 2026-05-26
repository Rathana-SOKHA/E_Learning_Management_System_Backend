import { Router } from 'express';
import { createCourse } from '../controllers/CourseController.js';
const router = Router();
router.post("/", createCourse);
export default router;
