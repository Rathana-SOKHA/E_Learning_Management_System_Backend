import { CourseRepository } from "../repositories/CourseRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";
export class CourseService {
    constructor() {
        this.courseRepo = new CourseRepository();
        this.userRepo = new UserRepository();
    }
    // 👨‍🏫 CREATE COURSE (Teacher only)
    async createCourse(teacherId, title, description) {
        const teacher = await this.userRepo.findById(teacherId);
        if (!teacher) {
            throw new Error("Teacher not found");
        }
        return this.courseRepo.createCourse({
            title,
            description,
            teacher,
        });
    }
    // 📚 GET ALL COURSES
    async getAllCourses() {
        return this.courseRepo.findAll();
    }
}
