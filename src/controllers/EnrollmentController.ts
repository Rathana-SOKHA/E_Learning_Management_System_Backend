import { Request, Response } from "express";
import { EnrollmentService } from "../services/EnrollmentService.js";
import { ApiResponse } from "../utils/apiResponse.js";

export class EnrollmentController {
  private enrollmentService = new EnrollmentService();

  enrollCourse = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.user!.id);
      const { courseId } = req.body;

      const enrollment = await this.enrollmentService.enrollCourse(
        userId,
        courseId,
      );

      return ApiResponse.success(res, 201, "Enrolled successfully", enrollment);
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponse.error(res, 500, error.message);
      }
      return ApiResponse.error(res, 500, "Failed to enroll");
    }
  };
}
