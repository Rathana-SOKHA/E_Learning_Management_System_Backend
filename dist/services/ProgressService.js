import { ProgressRepository } from "../repositories/ProgressRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { LessonRepository } from "../repositories/LessonRepository.js";
export class ProgressService {
    progressRepo = new ProgressRepository();
    userRepo = new UserRepository();
    lessonRepo = new LessonRepository();
    async completeLesson(userId, lessonId) {
        const student = await this.userRepo.findById(userId);
        const lesson = await this.lessonRepo.findById(lessonId);
        if (!student) {
            throw new Error("Student not found");
        }
        if (!lesson) {
            throw new Error("Lesson not found");
        }
        let progress = await this.progressRepo.findByUserAndLesson(userId, lessonId);
        if (!progress) {
            progress = await this.progressRepo.create({
                user: student,
                lesson,
                is_completed: true,
                completed_at: new Date(),
            });
        }
        else {
            progress.is_completed = true;
            progress.completed_at = new Date();
            await this.progressRepo.save(progress);
        }
        return progress;
    }
    async getMyProgress(userId) {
        return this.progressRepo.findByStudent(userId);
    }
}
