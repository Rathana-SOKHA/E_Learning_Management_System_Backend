import { AuthService } from "../services/AuthService.js";
import { tokenBlacklist } from "../utils/tokenBlacklist.js";
const authService = new AuthService();
export class AuthController {
    async register(req, res) {
        try {
            const user = await authService.register(req.body);
            res.status(201).json({
                message: "Register success",
                user,
            });
        }
        catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);
            res.json(result);
        }
        catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
    async logout(req, res) {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader?.split(" ")[1];
            if (token) {
                tokenBlacklist.add(token);
            }
            return res.status(200).json({
                success: true,
                message: "Logged out successfully",
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Logout failed",
            });
        }
    }
    async profile(req, res) {
        try {
            console.log("🛠️ Profile - req.user:", req.user); // ← Debug log
            const userId = req.user?.id || req.user?.userId;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized - No user ID found in token"
                });
            }
            const user = await authService.getProfile(userId);
            res.json({
                success: true,
                user
            });
        }
        catch (error) {
            console.error("❌ Profile Error:", error);
            res.status(500).json({
                success: false,
                message: error.message || "Failed to get profile"
            });
        }
    }
}
