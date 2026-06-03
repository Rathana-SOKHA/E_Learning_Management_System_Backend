import { Request, Response } from "express";
import { LessonService } from "../services/LessonService.js";
import { ApiResponse } from "../utils/apiResponse.js";

export class LessonController {
  private lessonService = new LessonService();

  createLesson = async (req: Request, res: Response) => {
    try {
      const { courseId, title, content, video_url } = req.body;

      const lesson = await this.lessonService.createLesson(
        Number(courseId),
        title,
        content,
        video_url,
      );

      return ApiResponse.success(res, 201, "Lesson created", lesson);
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponse.error(res, 500, error.message);
      }
      return ApiResponse.error(res, 500, "Failed to create lesson");
    }
  };

  getLessons = async (_req: Request, res: Response) => {
    try {
      const lessons = await this.lessonService.getLessons();

      return ApiResponse.success(res, 200, "Lessons retrieved", lessons);
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponse.error(res, 500, error.message);
      }
      return ApiResponse.error(res, 500, "Failed to retrieve lessons");
    }
  };

  getLessonById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const lesson = await this.lessonService.getLessonById(id);

      return ApiResponse.success(res, 200, "Lesson retrieved", lesson);
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponse.error(res, 404, error.message);
      }
      return ApiResponse.error(res, 404, "Lesson not found");
    }
  };

  updateLesson = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { title, content, video_url } = req.body;

      const lesson = await this.lessonService.updateLesson(
        id,
        title,
        content,
        video_url,
      );

      return ApiResponse.success(res, 200, "Lesson updated", lesson);
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponse.error(res, 500, error.message);
      }
      return ApiResponse.error(res, 500, "Failed to update lesson");
    }
  };

  deleteLesson = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      await this.lessonService.deleteLesson(id);

      return ApiResponse.success(res, 200, "Lesson deleted");
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponse.error(res, 500, error.message);
      }
      return ApiResponse.error(res, 500, "Failed to delete lesson");
    }
  };
}
