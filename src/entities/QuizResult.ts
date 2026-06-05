// 
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";

import type { User } from "./User.js";
import type { Quiz } from "./Quiz.js";

@Entity("quiz_results")
export class QuizResult {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.quizResults, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Quiz, (quiz) => quiz.results, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "quiz_id" })
  quiz!: Quiz;

  @Column({
    type: "int",
  })
  score!: number;

  @CreateDateColumn()
  submitted_at!: Date;
}