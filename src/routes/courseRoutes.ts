import {Router} from 'express';
import{
    createCourse,
    getCourses,
    getCourseById
} from '../controllers/CourseController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', authMiddleware, createCourse);
router.get('/', getCourses);
router.get('/:id', getCourseById);

export default router;
