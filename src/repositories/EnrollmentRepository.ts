import { AppDataSource } from "../config/data-source.js";
import { Enrollment } from "../entities/Enrollment.js";

export class EnrollmentRepository {
  private repo = AppDataSource.getRepository(Enrollment);

  async enroll(data: Partial<Enrollment>) {
    const enrollment = this.repo.create(data);
    return this.repo.save(enrollment);
  }

  async findStudentCourses(userId: number) {
    return this.repo.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        course: true,
      },
    });
  }
}
