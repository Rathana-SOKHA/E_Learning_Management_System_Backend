import { AppDataSource } from "../config/data-source.js";
import { User } from "../entities/User.js";

export class UserRepository {
  private repository = AppDataSource.getRepository(User);

  async findByEmail(email: string) {
    return this.repository.findOne({
      where: { email },
      relations: {
        role: {
          rolePermissions: {
            permission: true,
          },
        },
      },
    });
  }

  async findById(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: {
        role: true,
      },
    });
  }

  async createUser(data: Partial<User>) {
    const user = this.repository.create(data);
    const savedUser = await this.repository.save(user);
    return this.repository.findOne({
      where: { id: savedUser.id },
      relations: {
        role: {
          rolePermissions: {
            permission: true,
          },
        },
      },
    });
  }
}