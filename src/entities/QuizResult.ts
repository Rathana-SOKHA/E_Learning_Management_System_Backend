// 
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Relation,
} from "typeorm";

import { User } from "./User.js";
import { Quiz } from "./Quiz.js";

@Entity("quiz_results")
export class QuizResult {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.quizResults, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user!: Relation<User>;

  @ManyToOne(() => Quiz, (quiz) => quiz.results, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "quiz_id" })
  quiz!: Relation<Quiz>;

  @Column({
    type: "int",
  })
  score!: number;

  @CreateDateColumn()
  submitted_at!: Date;
}