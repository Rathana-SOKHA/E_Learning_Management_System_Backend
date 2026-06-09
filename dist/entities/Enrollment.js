var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, } from "typeorm";
import { User } from "./User.js";
import { Course } from "./Course.js";
let Enrollment = class Enrollment {
    id;
    // Student
    user;
    // Course
    course;
    enrolled_at;
};
__decorate([
    PrimaryGeneratedColumn()
], Enrollment.prototype, "id", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.enrollments, {
        onDelete: "CASCADE",
    }),
    JoinColumn({ name: "user_id" })
], Enrollment.prototype, "user", void 0);
__decorate([
    ManyToOne(() => Course, (course) => course.enrollments, {
        onDelete: "CASCADE",
    }),
    JoinColumn({ name: "course_id" })
], Enrollment.prototype, "course", void 0);
__decorate([
    CreateDateColumn()
], Enrollment.prototype, "enrolled_at", void 0);
Enrollment = __decorate([
    Entity("enrollments")
], Enrollment);
export { Enrollment };
