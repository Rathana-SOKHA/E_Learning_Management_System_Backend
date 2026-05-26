import { CourseService } from "../services/CourseService.js";
const courseService = new CourseService();
export class CourseController {
    // ➕ CREATE COURSE
    async create(req, res) {
        try {
            const { title, description } = req.body;
            const teacherId = Number(req.user.id);
            const course = await courseService.createCourse(teacherId, title, description);
            return res.status(201).json({
                message: "Course created successfully",
                course,
            });
        }
        catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }
    // 📚 GET ALL COURSES
    async getAll(req, res) {
        try {
            const courses = await courseService.getAllCourses();
            return res.status(200).json({
                message: "All courses fetched",
                data: courses,
            });
        }
        catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }
}
