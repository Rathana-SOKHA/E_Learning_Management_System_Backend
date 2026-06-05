import { AppError } from "../utils/appError.js";
import { ApiResponse } from "../utils/apiResponse.js";
export const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return ApiResponse.error(res, err.statusCode, err.message);
    }
    return ApiResponse.error(res, 500, "Internal server error");
};
