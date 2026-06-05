import { QuizRepository } from "../repositories/QuizRepository.js";
import { CourseRepository } from "../repositories/CourseRepository.js";
export class QuizService {
    constructor() {
        this.quizRepo = new QuizRepository();
        this.courseRepo = new CourseRepository();
    }
    // CREATE QUIZ
    async createQuiz(courseId, title, description, total_marks) {
        const course = await this.courseRepo.findById(courseId);
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
    async getQuizById(id) {
        const quiz = await this.quizRepo.findById(id);
        if (!quiz) {
            throw new Error("Quiz not found");
        }
        return quiz;
    }
    // UPDATE QUIZ
    async updateQuiz(id, title, description, total_marks) {
        const quiz = await this.quizRepo.findById(id);
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
    async deleteQuiz(id) {
        const quiz = await this.quizRepo.findById(id);
        if (!quiz) {
            throw new Error("Quiz not found");
        }
        await this.quizRepo.deleteQuiz(id);
        return {
            message: "Quiz deleted successfully",
        };
    }
}
