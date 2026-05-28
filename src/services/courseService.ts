import { CourseRepository } from "../repositories/CourseRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";

export class CourseService {
  private courseRepo =
    new CourseRepository();

  private userRepo =
    new UserRepository();

  // CREATE
  async createCourse(
    teacherId: number,
    title: string,
    description: string
  ) {
    const teacher =
      await this.userRepo.findById(teacherId);

    if (!teacher) {
      throw new Error("Teacher not found");
    }

    return this.courseRepo.createCourse({
      title,
      description,
      teacher,
    });
  }

  // GET ALL
  async getAllCourses() {
    return this.courseRepo.findAll();
  }

  // GET ONE
  async getCourseById(id: number) {
    const course =
      await this.courseRepo.findById(id);

    if (!course) {
      throw new Error("Course not found");
    }

    return course;
  }

  // UPDATE
  async updateCourse(
    id: number,
    title: string,
    description: string
  ) {
    const course =
      await this.courseRepo.findById(id);

    if (!course) {
      throw new Error("Course not found");
    }

    return this.courseRepo.updateCourse(id, {
      title,
      description,
    });
  }

  // DELETE
  async deleteCourse(id: number) {
    const course =
      await this.courseRepo.findById(id);

    if (!course) {
      throw new Error("Course not found");
    }

    await this.courseRepo.deleteCourse(id);

    return {
      message:
        "Course deleted successfully",
    };
  }
}