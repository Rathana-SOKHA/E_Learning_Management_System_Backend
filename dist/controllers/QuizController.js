import { QuizService } from "../services/QuizService.js";
import { ApiResponse } from "../utils/apiResponse.js";
export class QuizController {
    constructor() {
        this.quizService = new QuizService();
        this.createQuiz = async (req, res) => {
            try {
                const { courseId, title, description, total_marks } = req.body;
                const quiz = await this.quizService.createQuiz(Number(courseId), title, description, Number(total_marks));
                return ApiResponse.success(res, 201, "Quiz created", quiz);
            }
            catch (error) {
                if (error instanceof Error) {
                    return ApiResponse.error(res, 500, error.message);
                }
                return ApiResponse.error(res, 500, "Failed to create quiz");
            }
        };
        this.getQuizzes = async (_req, res) => {
            try {
                const quizzes = await this.quizService.getAllQuizzes();
                return ApiResponse.success(res, 200, "Quizzes retrieved", quizzes);
            }
            catch (error) {
                if (error instanceof Error) {
                    return ApiResponse.error(res, 500, error.message);
                }
                return ApiResponse.error(res, 500, "Failed to retrieve quizzes");
            }
        };
        this.getQuizById = async (req, res) => {
            try {
                const id = Number(req.params.id);
                const quiz = await this.quizService.getQuizById(id);
                return ApiResponse.success(res, 200, "Quiz retrieved", quiz);
            }
            catch (error) {
                if (error instanceof Error) {
                    return ApiResponse.error(res, 404, error.message);
                }
                return ApiResponse.error(res, 404, "Quiz not found");
            }
        };
        this.updateQuiz = async (req, res) => {
            try {
                const id = Number(req.params.id);
                const { title, description, total_marks } = req.body;
                const quiz = await this.quizService.updateQuiz(id, title, description, Number(total_marks));
                return ApiResponse.success(res, 200, "Quiz updated", quiz);
            }
            catch (error) {
                if (error instanceof Error) {
                    return ApiResponse.error(res, 500, error.message);
                }
                return ApiResponse.error(res, 500, "Failed to update quiz");
            }
        };
        this.deleteQuiz = async (req, res) => {
            try {
                const id = Number(req.params.id);
                await this.quizService.deleteQuiz(id);
                return ApiResponse.success(res, 200, "Quiz deleted");
            }
            catch (error) {
                if (error instanceof Error) {
                    return ApiResponse.error(res, 500, error.message);
                }
                return ApiResponse.error(res, 500, "Failed to delete quiz");
            }
        };
    }
}
