import { AppDataSource } from "../config/data-source.js";
import { Course } from "../entities/Course.js";
export class CourseRepository {
    repository = AppDataSource.getRepository(Course);
    // CREATE
    async createCourse(data) {
        const course = this.repository.create(data);
        return this.repository.save(course);
    }
    // GET ALL
    async findAll() {
        return this.repository.find({
            relations: {
                teacher: true,
                lessons: true,
                quizzes: true,
            },
        });
    }
    // GET ONE
    async findById(id) {
        return this.repository.findOne({
            where: { id },
            relations: {
                teacher: true,
                lessons: true,
                quizzes: true,
            },
        });
    }
    // UPDATE
    async updateCourse(id, data) {
        await this.repository.update(id, data);
        return this.findById(id);
    }
    // DELETE
    async deleteCourse(id) {
        return this.repository.delete(id);
    }
}
