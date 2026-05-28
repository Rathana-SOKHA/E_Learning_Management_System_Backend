import { Request, Response } from "express";
import { CourseService } from "../services/courseService.js";

export class CourseController {
  private courseService = new CourseService();

  // CREATE COURSE
  createCourse = async (req: any, res: Response) => {
    try {
      const { title, description } = req.body;

      const teacherId = Number(req.user.id);

      const course = await this.courseService.createCourse(
        teacherId,
        title,
        description
      );

      return res.status(201).json(course);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  // GET ALL COURSES
  getCourses = async (req: Request, res: Response) => {
    const courses = await this.courseService.getAllCourses();
    return res.json(courses);
  };

  // GET BY ID
  getCourseById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const course = await this.courseService.getCourseById(
      Number(id)
    );

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    return res.json(course);
  };
}