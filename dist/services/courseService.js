import { CourseRepository } from "../repositories/CourseRepository.js";
export class CourseService {
    static async createCourse(title, description, teacher) {
        const course = CourseRepository.create({
            title,
            description,
            teacher,
        });
        return await CourseRepository.save(course);
    }
    static async getAllCourses() {
        return await CourseRepository.find({
            relations: ["teacher"],
        });
    }
    static async getCourseById(id) {
        return await CourseRepository.findOne({
            where: { id },
            relations: ["teacher", "lessons", "enrollments"],
        });
    }
}
