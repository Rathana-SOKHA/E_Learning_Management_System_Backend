import { AppDataSource } from "../config/data-source.js";
import { Course } from "../entities/Course.js";
export const CourseRepository = AppDataSource.getRepository(Course);
