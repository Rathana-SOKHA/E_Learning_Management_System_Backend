// 
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";

import type { Course } from "./Course.js";
import type { Progress } from "./Progress.js";

@Entity("lessons")
export class Lesson {
  @PrimaryGeneratedColumn()
  id!: number;

  // Lesson belongs to one Course
  @ManyToOne(() => Course, (course) => course.lessons, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "course_id",
  })
  course!: Course;

  @Column({
    type: "text",
  })
  title!: string;

  @Column({
    type: "text",
  })
  content!: string;

  @Column({
    type: "varchar",
    length: 150,
    nullable: true,
  })
  video_url!: string;

  @CreateDateColumn()
  created_at!: Date;

  // Student progress records for this lesson
  @OneToMany(() => Progress, (progress) => progress.lesson)
  progresses!: Progress[];
}