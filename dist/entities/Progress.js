var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, } from "typeorm";
import { User } from "./User.js";
import { Lesson } from "./Lesson.js";
let Progress = class Progress {
    id;
    user;
    lesson;
    is_completed;
    completed_at;
};
__decorate([
    PrimaryGeneratedColumn()
], Progress.prototype, "id", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.progresses, {
        onDelete: "CASCADE",
    }),
    JoinColumn({
        name: "user_id",
    })
], Progress.prototype, "user", void 0);
__decorate([
    ManyToOne(() => Lesson, (lesson) => lesson.progresses, {
        onDelete: "CASCADE",
    }),
    JoinColumn({
        name: "lesson_id",
    })
], Progress.prototype, "lesson", void 0);
__decorate([
    Column({
        type: "boolean",
        default: false,
    })
], Progress.prototype, "is_completed", void 0);
__decorate([
    Column({
        type: "timestamp",
        nullable: true,
    })
], Progress.prototype, "completed_at", void 0);
Progress = __decorate([
    Entity("progress")
], Progress);
export { Progress };
