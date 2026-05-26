import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

import { Role } from "./Role.js";
import { Enrollment } from "./Enrollment.js";
import { Course } from "./Course.js";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 100,
  })
  full_name!: string;

  @Column({
    type: "varchar",
    unique: true,
  })
  email!: string;

  @Column({
    type: "varchar",
  })
  password!: string;

  @ManyToOne(() => Role)
  @JoinColumn({
    name: "role_id",
  })
  role!: Role;

  // 👨‍🏫 Teacher courses
  @OneToMany(() => Course, (course) => course.teacher)
  courses!: Course[];

  // 👨‍🎓 Student enrollments
  @OneToMany(
    () => Enrollment,
    (enrollment) => enrollment.user
  )
  enrollments!: Enrollment[];
}