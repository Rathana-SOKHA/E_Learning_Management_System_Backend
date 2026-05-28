import { CourseRepository } from "../repositories/CourseRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";

export class CourseService {
  private courseRepo = new CourseRepository();
  private userRepo = new UserRepository();

  async createCourse(
    teacherId: number,
    title: string,
    description: string
  ) {
    const teacher = await this.userRepo.findById(teacherId);

    if (!teacher) {
      throw new Error("Teacher not found");
    }

    return this.courseRepo.createCourse({
      title,
      description,
      teacher,
    });
  }

  async getAllCourses() {
    return this.courseRepo.findAll();
  }

  async getCourseById(id: number) {
    return this.courseRepo.findById(id);
  }
}