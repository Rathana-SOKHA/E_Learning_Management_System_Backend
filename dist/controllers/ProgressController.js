import { ProgressService } from "../services/ProgressService.js";
import { ApiResponse } from "../utils/apiResponse.js";
export class ProgressController {
    constructor() {
        this.progressService = new ProgressService();
        this.completeLesson = async (req, res) => {
            try {
                const { lessonId } = req.body;
                const progress = await this.progressService.completeLesson(req.user.id, Number(lessonId));
                return ApiResponse.success(res, 200, "Lesson completed", progress);
            }
            catch (error) {
                if (error instanceof Error) {
                    return ApiResponse.error(res, 500, error.message);
                }
                return ApiResponse.error(res, 500, "Internal server error");
            }
        };
        this.getMyProgress = async (req, res) => {
            const progress = await this.progressService.getMyProgress(req.user.id);
            return ApiResponse.success(res, 200, "Progress retrieved", progress);
        };
    }
}
