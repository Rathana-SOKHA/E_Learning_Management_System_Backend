var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToMany, } from "typeorm";
import { Course } from "./Course.js";
import { Question } from "./Question.js";
import { QuizResult } from "./QuizResult.js";
let Quiz = class Quiz {
    id;
    title;
    description;
    total_marks;
    // Quiz belongs to Course
    course;
    questions;
    results;
    created_at;
};
__decorate([
    PrimaryGeneratedColumn()
], Quiz.prototype, "id", void 0);
__decorate([
    Column({
        type: "varchar",
        length: 150,
    })
], Quiz.prototype, "title", void 0);
__decorate([
    Column({
        type: "text",
        nullable: true,
    })
], Quiz.prototype, "description", void 0);
__decorate([
    Column({
        type: "int",
        default: 10,
    })
], Quiz.prototype, "total_marks", void 0);
__decorate([
    ManyToOne(() => Course, (course) => course.quizzes, {
        onDelete: "CASCADE",
    }),
    JoinColumn({
        name: "course_id",
    })
], Quiz.prototype, "course", void 0);
__decorate([
    OneToMany(() => Question, (question) => question.quiz)
], Quiz.prototype, "questions", void 0);
__decorate([
    OneToMany(() => QuizResult, (result) => result.quiz)
], Quiz.prototype, "results", void 0);
__decorate([
    CreateDateColumn()
], Quiz.prototype, "created_at", void 0);
Quiz = __decorate([
    Entity("quizzes")
], Quiz);
export { Quiz };
