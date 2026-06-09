var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, } from "typeorm";
import { Quiz } from "./Quiz.js";
let Question = class Question {
    id;
    question_text;
    option_a;
    option_b;
    option_c;
    option_d;
    correct_answer;
    // Question belongs to one Quiz
    quiz;
    created_at;
};
__decorate([
    PrimaryGeneratedColumn()
], Question.prototype, "id", void 0);
__decorate([
    Column({
        type: "text",
    })
], Question.prototype, "question_text", void 0);
__decorate([
    Column({
        type: "varchar",
        length: 255,
    })
], Question.prototype, "option_a", void 0);
__decorate([
    Column({
        type: "varchar",
        length: 255,
    })
], Question.prototype, "option_b", void 0);
__decorate([
    Column({
        type: "varchar",
        length: 255,
    })
], Question.prototype, "option_c", void 0);
__decorate([
    Column({
        type: "varchar",
        length: 255,
    })
], Question.prototype, "option_d", void 0);
__decorate([
    Column({
        type: "varchar",
        length: 1,
    })
], Question.prototype, "correct_answer", void 0);
__decorate([
    ManyToOne(() => Quiz, (quiz) => quiz.questions, {
        onDelete: "CASCADE",
    }),
    JoinColumn({
        name: "quiz_id",
    })
], Question.prototype, "quiz", void 0);
__decorate([
    CreateDateColumn()
], Question.prototype, "created_at", void 0);
Question = __decorate([
    Entity("questions")
], Question);
export { Question };
