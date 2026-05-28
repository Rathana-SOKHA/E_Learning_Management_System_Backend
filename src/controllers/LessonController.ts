import { Request, Response } from "express";

import { LessonService } from "../services/LessonService.js";

export class LessonController {
  private lessonService =
    new LessonService();

  // CREATE
  createLesson = async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        courseId,
        title,
        content,
        video_url,
      } = req.body;

      const lesson =
        await this.lessonService.createLesson(
          Number(courseId),
          title,
          content,
          video_url
        );

      return res.status(201).json({
        message:
          "Lesson created successfully",
        lesson,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  // GET ALL
  getLessons = async (
    req: Request,
    res: Response
  ) => {
    try {
      const lessons =
        await this.lessonService.getLessons();

      return res.status(200).json({
        data: lessons,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  // GET ONE
  getLessonById = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);

      const lesson =
        await this.lessonService.getLessonById(id);

      return res.status(200).json({
        data: lesson,
      });
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  };

  // UPDATE
  updateLesson = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);

      const {
        title,
        content,
        video_url,
      } = req.body;

      const lesson =
        await this.lessonService.updateLesson(
          id,
          title,
          content,
          video_url
        );

      return res.status(200).json({
        message:
          "Lesson updated successfully",
        lesson,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  // DELETE
  deleteLesson = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);

      const result =
        await this.lessonService.deleteLesson(id);

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
}