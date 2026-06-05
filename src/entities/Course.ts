// 
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";

import { User } from "./User.js";
import { Lesson } from "./Lesson.js";
import { Enrollment } from "./Enrollment.js";
import { Quiz } from "./Quiz.js";

@Entity("courses")
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 50,
  })
  title!: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description!: string;

  // Teacher relationship
  @ManyToOne(() => User, (user) => user.courses, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "teacher_id",
  })
  teacher!: User;

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons!: Lesson[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments!: Enrollment[];

  @OneToMany(() => Quiz, (quiz) => quiz.course)
  quizzes!: Quiz[];

  @CreateDateColumn()
  created_at!: Date;
}