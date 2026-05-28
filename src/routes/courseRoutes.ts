import {Router} from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';

import { CourseController } from "../controllers/CourseController.js"
const controllers = new CourseController();

const router = Router();

router.post('/', authMiddleware, controllers.createCourse);
router.get('/', controllers.getCourses);
router.get('/:id', controllers.getCourseById);

export default router;


