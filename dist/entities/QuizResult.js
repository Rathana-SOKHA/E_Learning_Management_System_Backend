var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, } from "typeorm";
import { User } from "./User.js";
import { Quiz } from "./Quiz.js";
let QuizResult = class QuizResult {
    id;
    user;
    quiz;
    score;
    submitted_at;
};
__decorate([
    PrimaryGeneratedColumn()
], QuizResult.prototype, "id", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.quizResults, {
        onDelete: "CASCADE",
    }),
    JoinColumn({ name: "user_id" })
], QuizResult.prototype, "user", void 0);
__decorate([
    ManyToOne(() => Quiz, (quiz) => quiz.results, {
        onDelete: "CASCADE",
    }),
    JoinColumn({ name: "quiz_id" })
], QuizResult.prototype, "quiz", void 0);
__decorate([
    Column({
        type: "int",
    })
], QuizResult.prototype, "score", void 0);
__decorate([
    CreateDateColumn()
], QuizResult.prototype, "submitted_at", void 0);
QuizResult = __decorate([
    Entity("quiz_results")
], QuizResult);
export { QuizResult };
