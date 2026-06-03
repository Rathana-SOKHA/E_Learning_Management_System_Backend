import { EnrollmentRepository } from "../repositories/EnrollmentRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { CourseRepository } from "../repositories/CourseRepository.js";

export class EnrollmentService {
  private enrollmentRepo = new EnrollmentRepository();

  private userRepo = new UserRepository();

  private courseRepo = new CourseRepository();

  async enrollCourse(userId: number, courseId: number) {
    const student = await this.userRepo.findById(userId);

    if (!student) {
      throw new Error("Student not found");
    }

    const course = await this.courseRepo.findById(courseId);

    if (!course) {
      throw new Error("Course not found");
    }

    return this.enrollmentRepo.enroll({
      user: student,
      course,
    });
  }
}
