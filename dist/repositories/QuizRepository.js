import { AppDataSource } from "../config/data-source.js";
import { Quiz } from "../entities/Quiz.js";
export class QuizRepository {
    constructor() {
        this.repository = AppDataSource.getRepository(Quiz);
    }
    async createQuiz(data) {
        const quiz = this.repository.create(data);
        return this.repository.save(quiz);
    }
    async findAll() {
        return this.repository.find({
            relations: {
                course: true,
            },
        });
    }
    async findById(id) {
        return this.repository.findOne({
            where: { id },
            relations: {
                course: true,
            },
        });
    }
    async updateQuiz(id, data) {
        await this.repository.update(id, data);
        return this.findById(id);
    }
    async deleteQuiz(id) {
        return this.repository.delete(id);
    }
}
