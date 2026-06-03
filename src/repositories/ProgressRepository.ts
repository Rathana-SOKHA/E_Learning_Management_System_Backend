import { AppDataSource } from "../config/data-source.js";
import { Progress } from "../entities/Progress.js";

export class ProgressRepository {
  private repository =
    AppDataSource.getRepository(Progress);

  async create(
    data: Partial<Progress>
  ) {
    const progress =
      this.repository.create(data);

    return this.repository.save(progress);
  }

  async findByUserAndLesson(
    userId: number,
    lessonId: number
  ) {
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

  async save(
    progress: Progress
  ) {
    return this.repository.save(progress);
  }

  async findByStudent(
    userId: number
  ) {
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