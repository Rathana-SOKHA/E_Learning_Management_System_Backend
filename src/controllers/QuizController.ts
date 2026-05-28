import { Request, Response } from "express";

import { QuizService } from "../services/QuizService.js";

export class QuizController {
  private quizService =
    new QuizService();

  // CREATE
  createQuiz = async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        courseId,
        title,
        description,
        total_marks,
      } = req.body;

      const quiz =
        await this.quizService.createQuiz(
          Number(courseId),
          title,
          description,
          Number(total_marks)
        );

      return res.status(201).json({
        message: "Quiz created successfully",
        quiz,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  // GET ALL
  getQuizzes = async (
    req: Request,
    res: Response
  ) => {
    try {
      const quizzes =
        await this.quizService.getAllQuizzes();

      return res.status(200).json({
        data: quizzes,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  // GET ONE
  getQuizById = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);

      const quiz =
        await this.quizService.getQuizById(id);

      return res.status(200).json({
        data: quiz,
      });
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  };

  // UPDATE
  updateQuiz = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);

      const {
        title,
        description,
        total_marks,
      } = req.body;

      const quiz =
        await this.quizService.updateQuiz(
          id,
          title,
          description,
          Number(total_marks)
        );

      return res.status(200).json({
        message: "Quiz updated successfully",
        quiz,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  // DELETE
  deleteQuiz = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);

      const result =
        await this.quizService.deleteQuiz(id);

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
}