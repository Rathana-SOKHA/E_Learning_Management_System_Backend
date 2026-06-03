import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";

import { Course } from "./Course.js";
import { Question } from "./Question.js";
import { QuizResult } from "./QuizResult.js";

@Entity("quizzes")
export class Quiz {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 150,
  })
  title!: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description!: string;

  @Column({
    type: "int",
    default: 10,
  })
  total_marks!: number;

  // Quiz belongs to Course
  @ManyToOne(
    () => Course,
    (course) => course.quizzes,
    {
      onDelete: "CASCADE",
    }
  )
  @JoinColumn({
    name: "course_id",
  })
  course!: Course;

  // Quiz has many Questions
  @OneToMany(
    () => Question,
    (question) => question.quiz
  )
  questions!: Question[];

  // Quiz has many Results
  @OneToMany(
    () => QuizResult,
    (result) => result.quiz
  )
  results!: QuizResult[];

  @CreateDateColumn()
  created_at!: Date;
}