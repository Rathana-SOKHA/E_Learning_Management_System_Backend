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

  async findById(id: number | string) {
    try {
      // Copy the same style as your `findByEmail` method
      // Example (adjust according to your repository pattern):

      return await this.repository.findOne({
        where: { id: String(id) },
        relations: {
          role: {
            rolePermissions: {
              permission: true,
            },
          },
        },
      });

      // OR if you use query builder or raw query, use similar pattern as findByEmail

    } catch (error) {
      console.error("FindById Error:", error);
      return null;
    }
  }
}

