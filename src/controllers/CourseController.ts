import { Request, Response } from "express";
import { CourseService } from "../services/courseService.js";
import { ApiResponse } from "../utils/apiResponse.js";

export class CourseController {
  private courseService = new CourseService();

  createCourse = async (req: Request, res: Response) => {
    try {
      const { teacherId, title, description } = req.body;

      const course = await this.courseService.createCourse(
        Number(teacherId),
        title,
        description,
      );

      return ApiResponse.success(res, 201, "Course created", course);
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponse.error(res, 500, error.message);
      }
      return ApiResponse.error(res, 500, "Failed to create course");
    }
  };

  getCourses = async (_req: Request, res: Response) => {
    try {
      const courses = await this.courseService.getAllCourses();

      return ApiResponse.success(res, 200, "Courses retrieved", courses);
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponse.error(res, 500, error.message);
      }
      return ApiResponse.error(res, 500, "Failed to retrieve courses");
    }
  };

  getCourseById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const course = await this.courseService.getCourseById(id);

      return ApiResponse.success(res, 200, "Course retrieved", course);
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponse.error(res, 404, error.message);
      }
      return ApiResponse.error(res, 404, "Course not found");
    }
  };

  updateCourse = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { title, description } = req.body;

      const course = await this.courseService.updateCourse(
        id,
        title,
        description,
      );

      return ApiResponse.success(res, 200, "Course updated", course);
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponse.error(res, 500, error.message);
      }
      return ApiResponse.error(res, 500, "Failed to update course");
    }
  };

  deleteCourse = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      await this.courseService.deleteCourse(id);

      return ApiResponse.success(res, 200, "Course deleted");
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponse.error(res, 500, error.message);
      }
      return ApiResponse.error(res, 500, "Failed to delete course");
    }
  };
}
