import { QuizRepository } from "../repositories/QuizRepository.js";
import { CourseRepository } from "../repositories/CourseRepository.js";

export class QuizService {
  private quizRepo =
    new QuizRepository();

  private courseRepo =
    new CourseRepository();

  // CREATE QUIZ
  async createQuiz(
    courseId: number,
    title: string,
    description: string,
    total_marks: number
  ) {
    const course =
      await this.courseRepo.findById(courseId);

    if (!course) {
      throw new Error("Course not found");
    }

    return this.quizRepo.createQuiz({
      title,
      description,
      total_marks,
      course,
    });
  }

  // GET ALL QUIZZES
  async getAllQuizzes() {
    return this.quizRepo.findAll();
  }

  // GET ONE QUIZ
  async getQuizById(id: number) {
    const quiz =
      await this.quizRepo.findById(id);

    if (!quiz) {
      throw new Error("Quiz not found");
    }

    return quiz;
  }

  // UPDATE QUIZ
  async updateQuiz(
    id: number,
    title: string,
    description: string,
    total_marks: number
  ) {
    const quiz =
      await this.quizRepo.findById(id);

    if (!quiz) {
      throw new Error("Quiz not found");
    }

    return this.quizRepo.updateQuiz(id, {
      title,
      description,
      total_marks,
    });
  }

  // DELETE QUIZ
  async deleteQuiz(id: number) {
    const quiz =
      await this.quizRepo.findById(id);

    if (!quiz) {
      throw new Error("Quiz not found");
    }

    await this.quizRepo.deleteQuiz(id);

    return {
      message: "Quiz deleted successfully",
    };
  }
}