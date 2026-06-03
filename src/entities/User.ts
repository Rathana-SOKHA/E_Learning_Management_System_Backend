import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

import { Role } from "./Role.js";
import { Enrollment } from "./Enrollment.js";
import { Course } from "./Course.js";
import { Progress } from "./Progress.js";
import { QuizResult } from "./QuizResult.js";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 100,
  })
  full_name!: string;

  @Column({
    type: "varchar",
    unique: true,
  })
  email!: string;

  @Column({
    type: "varchar",
  })
  password!: string;

  // 🔐 Role
  @ManyToOne(() => Role)
  @JoinColumn({
    name: "role_id",
  })
  role!: Role;

  // 👨‍🏫 Teacher → Courses
  @OneToMany(
    () => Course,
    (course) => course.teacher
  )
  courses!: Course[];

  // 👨‍🎓 Student → Enrollments
  @OneToMany(
    () => Enrollment,
    (enrollment) => enrollment.user
  )
  enrollments!: Enrollment[];

  // 📈 Student → Progress
  @OneToMany(
    () => Progress,
    (progress) => progress.user
  )
  progresses!: Progress[];

  // 📝 Student → Quiz Results
  @OneToMany(
    () => QuizResult,
    (result) => result.user
  )
  quizResults!: QuizResult[];
}