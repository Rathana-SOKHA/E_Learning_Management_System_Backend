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

@Entity("courses")
export class Course {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 50 })
  title!: string;

  @Column({ type: "text", nullable: true })
  description!: string;

  // 👨‍🏫 Teacher relationship
  @ManyToOne(() => User, (user) => user.courses, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "teacher_id" })
  teacher!: User;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons!: Lesson[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments!: Enrollment[];
}