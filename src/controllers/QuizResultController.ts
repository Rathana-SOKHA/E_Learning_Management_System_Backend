import { Request, Response } from "express";
import { QuizResultService } from "../services/QuizResultService.js";

export class QuizResultController {
  private resultService =
    new QuizResultService();

  submitQuiz = async (
    req: any,
    res: Response
  ) => {
    try {
      const { quizId, score } =
        req.body;

      const result =
        await this.resultService.submitQuiz(
          req.user.id,
          Number(quizId),
          Number(score)
        );

      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  getMyResults = async (
    req: any,
    res: Response
  ) => {
    const results =
      await this.resultService.getMyResults(
        req.user.id
      );

    return res.json(results);
  };
}