import { Request, Response } from "express";
import { ProgressService } from "../services/ProgressService.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { AppError } from "../utils/appError.js";

export class ProgressController {
  private progressService = new ProgressService();

  completeLesson = async (req: Request, res: Response) => {
    try {
      const { lessonId } = req.body;

      const progress = await this.progressService.completeLesson(
        req.user!.id,
        Number(lessonId),
      );

      return ApiResponse.success(res, 200, "Lesson completed", progress);
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponse.error(res, 500, error.message);
      }
      return ApiResponse.error(res, 500, "Internal server error");
    }
  };

  getMyProgress = async (req: Request, res: Response) => {
    const progress = await this.progressService.getMyProgress(req.user!.id);

    return ApiResponse.success(res, 200, "Progress retrieved", progress);
  };
}
