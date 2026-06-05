// 
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
} from "typeorm";

import { User } from "./User.js";
import { Lesson } from "./Lesson.js";

@Entity("progress")
export class Progress {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.progresses, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "user_id",
  })
  user!: Relation<User>;

  @ManyToOne(() => Lesson, (lesson) => lesson.progresses, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "lesson_id",
  })
  lesson!: Relation<Lesson>;

  @Column({
    type: "boolean",
    default: false,
  })
  is_completed!: boolean;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  completed_at!: Date | null;
}