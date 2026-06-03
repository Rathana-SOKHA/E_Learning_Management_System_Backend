import { Request, Response } from "express";
import { ProgressService } from "../services/ProgressService.js";

export class ProgressController {
  private progressService =
    new ProgressService();

  completeLesson = async (
    req: any,
    res: Response
  ) => {
    try {
      const { lessonId } =
        req.body;

      const progress =
        await this.progressService.completeLesson(
          req.user.id,
          Number(lessonId)
        );

      return res.status(200).json({
        message:
          "Lesson completed",
        progress,
      });
    } catch (error: any) {
      return res.status(500).json({
        message:
          error.message,
      });
    }
  };

  getMyProgress = async (
    req: any,
    res: Response
  ) => {
    const progress =
      await this.progressService.getMyProgress(
        req.user.id
      );

    return res.json(progress);
  };
}