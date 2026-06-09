import { AppDataSource } from "../config/data-source.js";
import { Progress } from "../entities/Progress.js";
export class ProgressRepository {
    repository = AppDataSource.getRepository(Progress);
    async create(data) {
        const progress = this.repository.create(data);
        return this.repository.save(progress);
    }
    async findByUserAndLesson(userId, lessonId) {
        return this.repository.findOne({
            where: {
                user: {
                    id: userId,
                },
                lesson: {
                    id: lessonId,
                },
            },
        });
    }
    async save(progress) {
        return this.repository.save(progress);
    }
    async findByStudent(userId) {
        return this.repository.find({
            where: {
                user: {
                    id: userId,
                },
            },
            relations: {
                lesson: true,
            },
        });
    }
}
