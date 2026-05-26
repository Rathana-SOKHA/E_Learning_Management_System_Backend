import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";

import { Course } from "./Course.js";

@Entity("lessons")
export class Lesson {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // 📚 Relation: Lesson belongs to one Course
  @ManyToOne(() => Course, (course) => course.lessons, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "course_id" })
  course!: Course;

  @Column({ type: "text" })
  title!: string;

  // ⚠️ NOTE: UUID type is NOT correct for content
  // better use TEXT or LONGTEXT
  @Column({ type: "text" })
  content!: string;

  @Column({ type: "varchar", length: 150, nullable: true })
  video_url!: string;

  @CreateDateColumn()
  created_at!: Date;
}