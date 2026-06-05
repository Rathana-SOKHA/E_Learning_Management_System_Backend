// 
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
  Relation,
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
  teacher!: Relation<User>;

  // Lessons relationship
  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons!: Relation<Lesson[]>;

  // Enrollments relationship
  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments!: Relation<Enrollment[]>;

  // Quizzes relationship
  @OneToMany(() => Quiz, (quiz) => quiz.course)
  quizzes!: Relation<Quiz[]>;

  @CreateDateColumn()
  created_at!: Date;
}