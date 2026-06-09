// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   JoinColumn,
//   OneToMany,
// } from "typeorm";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// import { Role } from "./Role.js";
// import { Enrollment } from "./Enrollment.js";
// import { Course } from "./Course.js";
// import { Progress } from "./Progress.js";
// import { QuizResult } from "./QuizResult.js";
// @Entity("users")
// export class User {
//   @PrimaryGeneratedColumn()
//   id!: number;
//   @Column({
//     type: "varchar",
//     length: 100,
//   })
//   full_name!: string;
//   @Column({
//     type: "varchar",
//     unique: true,
//   })
//   email!: string;
//   @Column({
//     type: "varchar",
//   })
//   password!: string;
//   // Role
//   @ManyToOne(() => Role)
//   @JoinColumn({
//     name: "role_id",
//   })
//   role!: Role;
//   // Teacher → Courses
//   @OneToMany(() => Course, (course) => course.teacher)
//   courses!: Course[];
//   // Student → Enrollments
//   @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
//   enrollments!: Enrollment[];
//   // Student → Progress
//   @OneToMany(() => Progress, (progress) => progress.user)
//   // progresses!: Progress[];
//   progresses!: any[];
//   // Student → Quiz Results
//   @OneToMany(() => QuizResult, (result) => result.user)
//   quizResults!: QuizResult[];
// }
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, } from "typeorm";
import { Role } from "./Role.js";
import { Enrollment } from "./Enrollment.js";
import { Course } from "./Course.js";
import { Progress } from "./Progress.js";
import { QuizResult } from "./QuizResult.js";
let User = class User {
    id;
    full_name;
    email;
    password;
    role;
    courses;
    enrollments;
    progresses;
    quizResults;
};
__decorate([
    PrimaryGeneratedColumn()
], User.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", length: 100 })
], User.prototype, "full_name", void 0);
__decorate([
    Column({ type: "varchar", unique: true })
], User.prototype, "email", void 0);
__decorate([
    Column({ type: "varchar" })
], User.prototype, "password", void 0);
__decorate([
    ManyToOne(() => Role),
    JoinColumn({ name: "role_id" })
], User.prototype, "role", void 0);
__decorate([
    OneToMany(() => Course, (course) => course.teacher)
], User.prototype, "courses", void 0);
__decorate([
    OneToMany(() => Enrollment, (enrollment) => enrollment.user)
], User.prototype, "enrollments", void 0);
__decorate([
    OneToMany(() => Progress, (progress) => progress.user)
], User.prototype, "progresses", void 0);
__decorate([
    OneToMany(() => QuizResult, (result) => result.user)
], User.prototype, "quizResults", void 0);
User = __decorate([
    Entity("users")
], User);
export { User };
