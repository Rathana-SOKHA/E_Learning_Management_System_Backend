import { Request, Response } from "express";

import { QuestionService } from "../services/QuestionService.js";

export class QuestionController {
  private questionService =
    new QuestionService();

  // CREATE
  createQuestion = async (
    req: Request,
    res: Response
  ) => {
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

      const question =
        await this.questionService.createQuestion(
          Number(quizId),
          question_text,
          option_a,
          option_b,
          option_c,
          option_d,
          correct_answer
        );

      return res.status(201).json({
        message:
          "Question created successfully",
        question,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  // GET ALL
  getQuestions = async (
    req: Request,
    res: Response
  ) => {
    try {
      const questions =
        await this.questionService.getQuestions();

      return res.status(200).json({
        data: questions,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  // GET ONE
  getQuestionById = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);

      const question =
        await this.questionService.getQuestionById(id);

      return res.status(200).json({
        data: question,
      });
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  };

  // UPDATE
  updateQuestion = async (
    req: Request,
    res: Response
  ) => {
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

      const question =
        await this.questionService.updateQuestion(
          id,
          question_text,
          option_a,
          option_b,
          option_c,
          option_d,
          correct_answer
        );

      return res.status(200).json({
        message:
          "Question updated successfully",
        question,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  // DELETE
  deleteQuestion = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);

      const result =
        await this.questionService.deleteQuestion(id);

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
}