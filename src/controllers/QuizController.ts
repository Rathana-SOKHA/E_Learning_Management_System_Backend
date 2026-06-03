import { Request, Response } from "express";
import { QuizService } from "../services/QuizService.js";
import { ApiResponse } from "../utils/apiResponse.js";

export class QuizController {
  private quizService = new QuizService();

  createQuiz = async (req: Request, res: Response) => {
    try {
      const { courseId, title, description, total_marks } = req.body;

      const quiz = await this.quizService.createQuiz(
        Number(courseId),
        title,
        description,
        Number(total_marks),
      );

      return ApiResponse.success(res, 201, "Quiz created", quiz);
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponse.error(res, 500, error.message);
      }
      return ApiResponse.error(res, 500, "Failed to create quiz");
    }
  };

  getQuizzes = async (_req: Request, res: Response) => {
    try {
      const quizzes = await this.quizService.getAllQuizzes();

      return ApiResponse.success(res, 200, "Quizzes retrieved", quizzes);
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponse.error(res, 500, error.message);
      }
      return ApiResponse.error(res, 500, "Failed to retrieve quizzes");
    }
  };

  getQuizById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const quiz = await this.quizService.getQuizById(id);

      return ApiResponse.success(res, 200, "Quiz retrieved", quiz);
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponse.error(res, 404, error.message);
      }
      return ApiResponse.error(res, 404, "Quiz not found");
    }
  };

  updateQuiz = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { title, description, total_marks } = req.body;

      const quiz = await this.quizService.updateQuiz(
        id,
        title,
        description,
        Number(total_marks),
      );

      return ApiResponse.success(res, 200, "Quiz updated", quiz);
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponse.error(res, 500, error.message);
      }
      return ApiResponse.error(res, 500, "Failed to update quiz");
    }
  };

  deleteQuiz = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      await this.quizService.deleteQuiz(id);

      return ApiResponse.success(res, 200, "Quiz deleted");
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponse.error(res, 500, error.message);
      }
      return ApiResponse.error(res, 500, "Failed to delete quiz");
    }
  };
}
