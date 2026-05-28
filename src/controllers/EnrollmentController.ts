import { Request, Response } from "express";
import { EnrollmentService } from "../services/EnrollmentService.js";

const enrollmentService =
  new EnrollmentService();

export class EnrollmentController {
  enrollCourse = async (
    req: any,
    res: Response
  ) => {
    try {
      const userId = Number(req.user.id);

      const { courseId } = req.body;

      const enrollment =
        await enrollmentService.enrollCourse(
          userId,
          courseId
        );

      return res.status(201).json({
        message: "Enrolled successfully",
        enrollment,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
}