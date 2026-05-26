import { AppDataSource } from "../config/data-source.js";
import { User } from "../entities/User.js";

export class UserRepository {
  private repository =
    AppDataSource.getRepository(User);

  async findByEmail(email: string) {
    return this.repository.findOne({
      where: {
        email,
      },

      relations: {
        role: {
          rolePermissions: {
            permission: true,
          },
        },
      }
    });
  }

  async createUser(data: Partial<User>) {
    const user =
      this.repository.create(data);

    return this.repository.save(user);
  }
}