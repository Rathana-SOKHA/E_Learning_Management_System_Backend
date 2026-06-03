import { AppDataSource } from "../config/data-source.js";
import { QuizResult } from "../entities/QuizResult.js";

export class QuizResultRepository {
  private repository = AppDataSource.getRepository(QuizResult);

  async create(data: Partial<QuizResult>) {
    const result = this.repository.create(data);

    return this.repository.save(result);
  }

  async findByStudent(userId: number) {
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
