// 
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";

import type { Quiz } from "./Quiz.js";

@Entity("questions")
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "text",
  })
  question_text!: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  option_a!: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  option_b!: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  option_c!: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  option_d!: string;

  @Column({
    type: "varchar",
    length: 1,
  })
  correct_answer!: string;

  // Question belongs to one Quiz
  @ManyToOne(() => Quiz, (quiz) => quiz.questions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "quiz_id",
  })
  quiz!: Quiz;

  @CreateDateColumn()
  created_at!: Date;
}