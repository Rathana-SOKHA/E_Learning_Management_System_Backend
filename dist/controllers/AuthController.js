import { AuthService } from "../services/AuthService.js";
import { ApiResponse } from "../utils/apiResponse.js";
export class AuthController {
    authService = new AuthService();
    async register(req, res) {
        try {
            const user = await this.authService.register(req.body);
            return ApiResponse.success(res, 201, "Register success", user);
        }
        catch (error) {
            if (error instanceof Error) {
                return ApiResponse.error(res, 400, error.message);
            }
            return ApiResponse.error(res, 400, "Registration failed");
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);
            return ApiResponse.success(res, 200, "Login success", result);
        }
        catch (error) {
            if (error instanceof Error) {
                return ApiResponse.error(res, 400, error.message);
            }
            return ApiResponse.error(res, 400, "Login failed");
        }
    }
}
