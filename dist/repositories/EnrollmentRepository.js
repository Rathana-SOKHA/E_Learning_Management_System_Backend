import { AppDataSource } from "../config/data-source.js";
import { Enrollment } from "../entities/Enrollment.js";
export class EnrollmentRepository {
    constructor() {
        this.repo = AppDataSource.getRepository(Enrollment);
    }
    async enroll(data) {
        const enrollment = this.repo.create(data);
        return this.repo.save(enrollment);
    }
    async findStudentCourses(userId) {
        return this.repo.find({
            where: {
                user: {
                    id: userId,
                },
            },
            relations: {
                course: true,
            },
        });
    }
}
