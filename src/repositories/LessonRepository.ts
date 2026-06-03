import { AppDataSource } from "../config/data-source.js";
import { Lesson } from "../entities/Lesson.js";

export class LessonRepository {
  private repository = AppDataSource.getRepository(Lesson);

  // CREATE
  async createLesson(data: Partial<Lesson>) {
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
  async findById(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: {
        course: true,
      },
    });
  }

  // UPDATE
  async updateLesson(id: number, data: Partial<Lesson>) {
    await this.repository.update(id, data);

    return this.findById(id);
  }

  // DELETE
  async deleteLesson(id: number) {
    return this.repository.delete(id);
  }
}
