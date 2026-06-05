// 
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";

import type { User } from "./User.js";
import type { Course } from "./Course.js";

@Entity("enrollments")
export class Enrollment {
  @PrimaryGeneratedColumn()
  id!: number;

  // Student
  @ManyToOne(() => User, (user) => user.enrollments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user!: User;

  // Course
  @ManyToOne(() => Course, (course) => course.enrollments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "course_id" })
  course!: Course;

  @CreateDateColumn()
  enrolled_at!: Date;
}