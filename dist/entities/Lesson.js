var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, } from "typeorm";
import { Course } from "./Course.js";
import { Progress } from "./Progress.js";
let Lesson = class Lesson {
    id;
    // Lesson belongs to one Course
    course;
    title;
    content;
    video_url;
    created_at;
    // Student progress records for this lesson
    progresses;
};
__decorate([
    PrimaryGeneratedColumn()
], Lesson.prototype, "id", void 0);
__decorate([
    ManyToOne(() => Course, (course) => course.lessons, {
        onDelete: "CASCADE",
    }),
    JoinColumn({
        name: "course_id",
    })
], Lesson.prototype, "course", void 0);
__decorate([
    Column({
        type: "text",
    })
], Lesson.prototype, "title", void 0);
__decorate([
    Column({
        type: "text",
    })
], Lesson.prototype, "content", void 0);
__decorate([
    Column({
        type: "varchar",
        length: 150,
        nullable: true,
    })
], Lesson.prototype, "video_url", void 0);
__decorate([
    CreateDateColumn()
], Lesson.prototype, "created_at", void 0);
__decorate([
    OneToMany(() => Progress, (progress) => progress.lesson)
], Lesson.prototype, "progresses", void 0);
Lesson = __decorate([
    Entity("lessons")
], Lesson);
export { Lesson };
