import { AuthService } from "../services/AuthService.js";
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
}
