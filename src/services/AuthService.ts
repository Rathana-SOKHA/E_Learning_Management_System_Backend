import { UserRepository } from "../repositories/UserRepository.js";
import { RoleRepository } from "../repositories/RoleRepository.js";

import { hashPassword, comparePassword } from "../utils/hashPassword.js";

import { generateToken } from "../utils/generateToken.js";

export class AuthService {
  private userRepository = new UserRepository();

  private roleRepository = new RoleRepository();

  async register(data: any) {
    const existUser = await this.userRepository.findByEmail(data.email);

    if (existUser) {
      throw new Error("Email already exists");
    }

    const role = await this.roleRepository.findByName(data.role);

    if (!role) {
      throw new Error("Role not found");
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await this.userRepository.createUser({
      full_name: data.full_name,
      email: data.email,
      password: hashedPassword,
      role,
    });

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const permissions = user.role.rolePermissions.map(
      (rp) => rp.permission.name,
    );
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
}
