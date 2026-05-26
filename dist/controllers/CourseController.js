import { CourseService } from "../services/CourseService.js";
import { AppDataSource } from "../config/data-source.js";
import { User } from "../entities/User.js";
const userRepository = AppDataSource.getRepository(User);
export const createCourse = async (req, res) => {
    try {
        const { title, description, teacher_id } = req.body;
        const teacher = await userRepository.findOne({
            where: { id: teacher_id },
        });
        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found",
            });
        }
        const course = await CourseService.createCourse(title, description, teacher);
        return res.status(201).json(course);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
};
// GET ALL COURSES
export const getCourses = async (req, res) => {
    const courses = await CourseService.getAllCourses();
    return res.json(courses);
};
// GET BY ID
export const getCourseById = async (req, res) => {
    const { id } = req.params;
    const course = await CourseService.getCourseById(id);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    return res.json(course);
};
