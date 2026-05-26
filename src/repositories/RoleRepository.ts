import { AppDataSource } from "../config/data-source.js";
import { Role } from "../entities/Role.js";

export class RoleRepository {
  private repository = AppDataSource.getRepository(Role);

  async findByName(name: string) {
    return this.repository.findOne({
      where: { name },
    });
  }
}