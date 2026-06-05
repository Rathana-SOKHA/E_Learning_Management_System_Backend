import { EnrollmentRepository } from "../repositories/EnrollmentRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { CourseRepository } from "../repositories/CourseRepository.js";
export class EnrollmentService {
    constructor() {
        this.enrollmentRepo = new EnrollmentRepository();
        this.userRepo = new UserRepository();
        this.courseRepo = new CourseRepository();
    }
    async enrollCourse(userId, courseId) {
        const student = await this.userRepo.findById(userId);
        if (!student) {
            throw new Error("Student not found");
        }
        const course = await this.courseRepo.findById(courseId);
        if (!course) {
            throw new Error("Course not found");
        }
        return this.enrollmentRepo.enroll({
            user: student,
            course,
        });
    }
}
