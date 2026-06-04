import { Request, Response } from "express";
import { AuthService } from "../services/AuthService.js";

import { tokenBlacklist } from "../utils/tokenBlacklist.js";

const authService = new AuthService();


export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const user = await authService.register(req.body);

      res.status(201).json({
        message: "Register success",
        user,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await authService.login(email, password);

      res.json({
        success: true,
        message: "Login successful",
        token: result.token,
        tokenType: "Bearer",
        expiresIn: "1d",
        user: result.user,
        instructions: "Use this token in Authorization header: Authorization: Bearer <token>"
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async logout(req: Request, res: Response) {
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
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Logout failed",
      });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      console.log("🛠️ getProfile called");
      console.log("📍 req.user:", req.user);

      const userId = req.user?.id;

      if (!userId) {
        console.log("❌ No userId found in token");
        return res.status(401).json({
          success: false,
          message: "Unauthorized - No user ID found in token"
        });
      }

      console.log("✅ UserId extracted:", userId);

      const user = await authService.getProfile(userId);

      console.log("✅ User profile retrieved:", user);

      res.json({
        success: true,
        user
      });
    } catch (error: any) {
      console.error("❌ Profile Error:", error.message);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to get profile"
      });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await authService.getAllUsers();

      res.json({
        success: true,
        count: users.length,
        users
      });
    } catch (error: any) {
      console.error("❌ GetAllUsers Error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to get users"
      });
    }
  }
}


