var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, } from "typeorm";
import { Quiz } from "./Quiz.js";
let Question = class Question {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Question.prototype, "id", void 0);
__decorate([
    Column({
        type: "text",
    }),
    __metadata("design:type", String)
], Question.prototype, "question_text", void 0);
__decorate([
    Column({
        type: "varchar",
        length: 255,
    }),
    __metadata("design:type", String)
], Question.prototype, "option_a", void 0);
__decorate([
    Column({
        type: "varchar",
        length: 255,
    }),
    __metadata("design:type", String)
], Question.prototype, "option_b", void 0);
__decorate([
    Column({
        type: "varchar",
        length: 255,
    }),
    __metadata("design:type", String)
], Question.prototype, "option_c", void 0);
__decorate([
    Column({
        type: "varchar",
        length: 255,
    }),
    __metadata("design:type", String)
], Question.prototype, "option_d", void 0);
__decorate([
    Column({
        type: "varchar",
        length: 1,
    }),
    __metadata("design:type", String)
], Question.prototype, "correct_answer", void 0);
__decorate([
    ManyToOne(() => Quiz, (quiz) => quiz.questions, {
        onDelete: "CASCADE",
    }),
    JoinColumn({
        name: "quiz_id",
    }),
    __metadata("design:type", Quiz)
], Question.prototype, "quiz", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Question.prototype, "created_at", void 0);
Question = __decorate([
    Entity("questions")
], Question);
export { Question };
