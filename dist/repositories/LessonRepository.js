import { AppDataSource } from "../config/data-source.js";
import { Lesson } from "../entities/Lesson.js";
export class LessonRepository {
    constructor() {
        this.repository = AppDataSource.getRepository(Lesson);
    }
    // CREATE
    async createLesson(data) {
        const lesson = this.repository.create(data);
        return this.repository.save(lesson);
    }
    // GET ALL
    async findAll() {
        return this.repository.find({
            relations: {
                course: true,
            },
        });
    }
    // GET ONE
    async findById(id) {
        return this.repository.findOne({
            where: { id },
            relations: {
                course: true,
            },
        });
    }
    // UPDATE
    async updateLesson(id, data) {
        await this.repository.update(id, data);
        return this.findById(id);
    }
    // DELETE
    async deleteLesson(id) {
        return this.repository.delete(id);
    }
}
