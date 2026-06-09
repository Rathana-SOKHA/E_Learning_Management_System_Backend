import { LessonRepository } from "../repositories/LessonRepository.js";
import { CourseRepository } from "../repositories/CourseRepository.js";
export class LessonService {
    lessonRepo = new LessonRepository();
    courseRepo = new CourseRepository();
    // CREATE
    async createLesson(courseId, title, content, video_url) {
        const course = await this.courseRepo.findById(courseId);
        if (!course) {
            throw new Error("Course not found");
        }
        return this.lessonRepo.createLesson({
            title,
            content,
            video_url,
            course,
        });
    }
    // GET ALL
    async getLessons() {
        return this.lessonRepo.findAll();
    }
    // GET ONE
    async getLessonById(id) {
        const lesson = await this.lessonRepo.findById(id);
        if (!lesson) {
            throw new Error("Lesson not found");
        }
        return lesson;
    }
    // UPDATE
    async updateLesson(id, title, content, video_url) {
        const lesson = await this.lessonRepo.findById(id);
        if (!lesson) {
            throw new Error("Lesson not found");
        }
        return this.lessonRepo.updateLesson(id, {
            title,
            content,
            video_url,
        });
    }
    // DELETE
    async deleteLesson(id) {
        const lesson = await this.lessonRepo.findById(id);
        if (!lesson) {
            throw new Error("Lesson not found");
        }
        await this.lessonRepo.deleteLesson(id);
        return {
            message: "Lesson deleted successfully",
        };
    }
}
