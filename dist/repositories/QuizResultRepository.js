import { AppDataSource } from "../config/data-source.js";
import { QuizResult } from "../entities/QuizResult.js";
export class QuizResultRepository {
    repository = AppDataSource.getRepository(QuizResult);
    async create(data) {
        const result = this.repository.create(data);
        return this.repository.save(result);
    }
    async findByStudent(userId) {
        return this.repository.find({
            where: {
                user: {
                    id: userId,
                },
            },
            relations: {
                quiz: true,
            },
        });
    }
}
