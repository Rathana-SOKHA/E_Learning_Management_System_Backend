import { Request, Response } from "express";
import { QuestionService } from "../services/QuestionService.js";
import { ApiResponse } from "../utils/apiResponse.js";

export class QuestionController {
  private questionService = new QuestionService();

  createQuestion = async (req: Request, res: Response) => {
    try {
      const {
        quizId,
        question_text,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_answer,
      } = req.body;

      const question = await this.questionService.createQuestion(
        Number(quizId),
        question_text,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_answer,
      );

      return ApiResponse.success(res, 201, "Question created", question);
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponse.error(res, 500, error.message);
      }
      return ApiResponse.error(res, 500, "Failed to create question");
    }
  };

  getQuestions = async (_req: Request, res: Response) => {
    try {
      const questions = await this.questionService.getQuestions();

      return ApiResponse.success(res, 200, "Questions retrieved", questions);
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponse.error(res, 500, error.message);
      }
      return ApiResponse.error(res, 500, "Failed to retrieve questions");
    }
  };

  getQuestionById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const question = await this.questionService.getQuestionById(id);

      return ApiResponse.success(res, 200, "Question retrieved", question);
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponse.error(res, 404, error.message);
      }
      return ApiResponse.error(res, 404, "Question not found");
    }
  };

  updateQuestion = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const {
        question_text,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_answer,
      } = req.body;

      const question = await this.questionService.updateQuestion(
        id,
        question_text,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_answer,
      );

      return ApiResponse.success(res, 200, "Question updated", question);
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponse.error(res, 500, error.message);
      }
      return ApiResponse.error(res, 500, "Failed to update question");
    }
  };

  deleteQuestion = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      await this.questionService.deleteQuestion(id);

      return ApiResponse.success(res, 200, "Question deleted");
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponse.error(res, 500, error.message);
      }
      return ApiResponse.error(res, 500, "Failed to delete question");
    }
  };
}
