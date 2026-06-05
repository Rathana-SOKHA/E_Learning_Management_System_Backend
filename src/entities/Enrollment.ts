// 
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Relation,
} from "typeorm";

import { User } from "./User.js";
import { Course } from "./Course.js";

@Entity("enrollments")
export class Enrollment {
  @PrimaryGeneratedColumn()
  id!: number;

  // Student
  @ManyToOne(() => User, (user) => user.enrollments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user!: Relation<User>;

  // Course
  @ManyToOne(() => Course, (course) => course.enrollments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "course_id" })
  course!: Relation<Course>;

  @CreateDateColumn()
  enrolled_at!: Date;
}