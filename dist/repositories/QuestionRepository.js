import { AppDataSource } from "../config/data-source.js";
import { Question } from "../entities/Question.js";
export class QuestionRepository {
    repository = AppDataSource.getRepository(Question);
    // CREATE
    async createQuestion(data) {
        const question = this.repository.create(data);
        return this.repository.save(question);
    }
    // GET ALL
    async findAll() {
        return this.repository.find({
            relations: {
                quiz: true,
            },
        });
    }
    // GET ONE
    async findById(id) {
        return this.repository.findOne({
            where: { id },
            relations: {
                quiz: true,
            },
        });
    }
    // UPDATE
    async updateQuestion(id, data) {
        await this.repository.update(id, data);
        return this.findById(id);
    }
    // DELETE
    async deleteQuestion(id) {
        return this.repository.delete(id);
    }
}
