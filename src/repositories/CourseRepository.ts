import { AppDataSource } from "../config/data-source.js";
import { Course } from "../entities/Course.js";

export class CourseRepository {
  private repository = AppDataSource.getRepository(Course);

  // ➕ create course
  async createCourse(data: Partial<Course>) {
    const course = this.repository.create(data);
    return this.repository.save(course);
  }

  // 📚 get all courses
  async findAll() {
    return this.repository.find({
      relations: {
        teacher: true,
        lessons: true,
      },
    });
  }
}