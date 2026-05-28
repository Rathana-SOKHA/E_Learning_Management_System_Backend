import { AppDataSource } from "../config/data-source.js";
import { Quiz } from "../entities/Quiz.js";

export class QuizRepository {
  private repository =
    AppDataSource.getRepository(Quiz);

  async createQuiz(data: Partial<Quiz>) {
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

  async findById(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: {
        course: true,
      },
    });
  }

  async updateQuiz(
    id: number,
    data: Partial<Quiz>
  ) {
    await this.repository.update(id, data);

    return this.findById(id);
  }

  async deleteQuiz(id: number) {
    return this.repository.delete(id);
  }
}