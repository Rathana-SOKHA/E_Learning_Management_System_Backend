import { QuizResultService } from "../services/QuizResultService.js";
import { ApiResponse } from "../utils/apiResponse.js";
export class QuizResultController {
    constructor() {
        this.resultService = new QuizResultService();
        this.submitQuiz = async (req, res) => {
            try {
                const { quizId, score } = req.body;
                const result = await this.resultService.submitQuiz(req.user.id, Number(quizId), Number(score));
                return ApiResponse.success(res, 201, "Quiz submitted", result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return ApiResponse.error(res, 500, error.message);
                }
                return ApiResponse.error(res, 500, "Internal server error");
            }
        };
        this.getMyResults = async (req, res) => {
            const results = await this.resultService.getMyResults(req.user.id);
            return ApiResponse.success(res, 200, "Results retrieved", results);
        };
    }
}
