import { QuizResultRepository } from "../repositories/QuizResultRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { QuizRepository } from "../repositories/QuizRepository.js";
export class QuizResultService {
    resultRepo = new QuizResultRepository();
    userRepo = new UserRepository();
    quizRepo = new QuizRepository();
    async submitQuiz(userId, quizId, score) {
        const student = await this.userRepo.findById(userId);
        const quiz = await this.quizRepo.findById(quizId);
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
    async getMyResults(userId) {
        return this.resultRepo.findByStudent(userId);
    }
}
