import "dotenv/config";
import { DataSource } from "typeorm";

import { User } from "../entities/User.js";
import { Role } from "../entities/Role.js";
import { Permission } from "../entities/Permission.js";
import { RolePermission } from "../entities/RolePermission.js";
import { Course } from "../entities/Course.js";
import { Lesson } from "../entities/Lesson.js";
import { Enrollment } from "../entities/Enrollment.js";
import { Quiz } from "../entities/Quiz.js";
import { Question } from "../entities/Question.js";
import { Progress } from "../entities/Progress.js";
import { QuizResult } from "../entities/QuizResult.js";

export const AppDataSource = new DataSource({
  type: "mysql",

  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  synchronize: true,
  logging: false,

  entities: [
    User,
    Role,
    Permission,
    RolePermission,
    Course,
    Lesson,
    Enrollment,
    Quiz,
    Question,
    Progress,
    QuizResult,
  ],
});
