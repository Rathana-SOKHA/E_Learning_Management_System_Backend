var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToMany, } from "typeorm";
import { User } from "./User.js";
import { Lesson } from "./Lesson.js";
import { Enrollment } from "./Enrollment.js";
import { Quiz } from "./Quiz.js";
let Course = class Course {
    id;
    title;
    description;
    // Teacher relationship
    teacher;
    lessons;
    enrollments;
    quizzes;
    created_at;
};
__decorate([
    PrimaryGeneratedColumn()
], Course.prototype, "id", void 0);
__decorate([
    Column({
        type: "varchar",
        length: 50,
    })
], Course.prototype, "title", void 0);
__decorate([
    Column({
        type: "text",
        nullable: true,
    })
], Course.prototype, "description", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.courses, {
        onDelete: "CASCADE",
    }),
    JoinColumn({
        name: "teacher_id",
    })
], Course.prototype, "teacher", void 0);
__decorate([
    OneToMany(() => Lesson, (lesson) => lesson.course)
], Course.prototype, "lessons", void 0);
__decorate([
    OneToMany(() => Enrollment, (enrollment) => enrollment.course)
], Course.prototype, "enrollments", void 0);
__decorate([
    OneToMany(() => Quiz, (quiz) => quiz.course)
], Course.prototype, "quizzes", void 0);
__decorate([
    CreateDateColumn()
], Course.prototype, "created_at", void 0);
Course = __decorate([
    Entity("courses")
], Course);
export { Course };
