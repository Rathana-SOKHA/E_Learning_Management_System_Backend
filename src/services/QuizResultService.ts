import { QuizResultRepository } from "../repositories/QuizResultRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { QuizRepository } from "../repositories/QuizRepository.js";

export class QuizResultService {
  private resultRepo =
    new QuizResultRepository();

  private userRepo =
    new UserRepository();

  private quizRepo =
    new QuizRepository();

  async submitQuiz(
    userId: number,
    quizId: number,
    score: number
  ) {
    const student =
      await this.userRepo.findById(userId);

    const quiz =
      await this.quizRepo.findById(quizId);

    if (!student) {
      throw new Error("Student not found");
    }

    if (!quiz) {
      throw new Error("Quiz not found");
    }

    return this.resultRepo.create({
      user: student,
      quiz,
      score,
    });
  }

  async getMyResults(
    userId: number
  ) {
    return this.resultRepo.findByStudent(
      userId
    );
  }
}