import { CourseRepository } from "../repositories/CourseRepository.js";
import { User } from "../entities/User.js";

export class CourseService {
  static async createCourse(
    title: string,
    description: string,
    teacher: User
  ) {
    const course = CourseRepository.create({
      title,
      description,
      teacher,
    });

    return await CourseRepository.save(course);
  }

  static async getAllCourses() {
    return await CourseRepository.find({
      relations: ["teacher"],
    });
  }

  static async getCourseById(id: string) {
    return await CourseRepository.findOne({
      where: { id },
      relations: ["teacher", "lessons", "enrollments"],
    });
  }
}