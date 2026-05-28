import { AppDataSource } from "../config/data-source.js";
import { Course } from "../entities/Course.js";

export class CourseRepository {
  private repo = AppDataSource.getRepository(Course);

  // ➕ create course
  async createCourse(data: Partial<Course>) {
    const course = this.repo.create(data);
    return this.repo.save(course);
  }

  // 📚 get all courses
  async findAll() {
    return this.repo.find({
      relations: {
        teacher: true,
      },
    });
  }

  // 🔍 get course by id
  async findById(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: {
        teacher: true,
        lessons: true,
      },
    });
  }
}