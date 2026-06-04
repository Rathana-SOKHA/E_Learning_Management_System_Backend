import { UserRepository } from "../repositories/UserRepository.js";
import { RoleRepository } from "../repositories/RoleRepository.js";

import { hashPassword, comparePassword } from "../utils/hashPassword.js";

import { generateToken } from "../utils/generateToken.js";

export class AuthService {
  private userRepository = new UserRepository();

  private roleRepository = new RoleRepository();

  async register(data: any) {
    const existUser =
      await this.userRepository.findByEmail(
        data.email
      );

    if (existUser) {
      throw new Error("Email already exists");
    }

    const role =
      await this.roleRepository.findByName(
        data.role
      );

    if (!role) {
      throw new Error("Role not found");
    }

    const hashedPassword = await hashPassword(
      data.password
    );

    const user =
      await this.userRepository.createUser({
        full_name: data.full_name,
        email: data.email,
        password: hashedPassword,
        role,
      });

    return user;
  }

  async login(email: string, password: string) {
    const user =
      await this.userRepository.findByEmail(
        email
      );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await comparePassword(
      password,
      user.password
    );

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const permissions = user.role.rolePermissions.map(rp => rp.permission.name);
    const token = generateToken({
      id: user.id,
      role: user.role.name,
      permissions,
    });

    return {
      token,
      user,
    };
  }
  async logout() {
    return {
      message: "Logged out successfully",
    };
  }
  async getProfile(userId: number | string) {
    try {
      console.log("🔍 getProfile service called with userId:", userId);
      
      const user = await this.userRepository.findById(userId);

      if (!user) {
        console.log("❌ User not found with id:", userId);
        throw new Error("User not found");
      }

      console.log("✅ User found:", user.email);

      // Remove password from response
      const { password, ...userProfile } = user;
      return userProfile;
    } catch (error: any) {
      console.error("❌ GetProfile Error:", error.message);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await this.userRepository.findAll();
      
      // Remove passwords from response
      return users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
    } catch (error: any) {
      console.error("GetAllUsers Error:", error);
      throw error;
    }
  }
  

}