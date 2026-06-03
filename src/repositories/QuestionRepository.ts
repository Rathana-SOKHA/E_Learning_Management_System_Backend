import { AppDataSource } from "../config/data-source.js";
import { Question } from "../entities/Question.js";

export class QuestionRepository {
  private repository = AppDataSource.getRepository(Question);

  // CREATE
  async createQuestion(data: Partial<Question>) {
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
  async findById(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: {
        quiz: true,
      },
    });
  }

  // UPDATE
  async updateQuestion(id: number, data: Partial<Question>) {
    await this.repository.update(id, data);

    return this.findById(id);
  }

  // DELETE
  async deleteQuestion(id: number) {
    return this.repository.delete(id);
  }
}
