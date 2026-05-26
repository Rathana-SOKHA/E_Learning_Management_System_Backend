import { AppDataSource } from "../config/data-source.js";
import { Role } from "../entities/Role.js";
export class RoleRepository {
    constructor() {
        this.repository = AppDataSource.getRepository(Role);
    }
    async findByName(name) {
        return this.repository.findOne({
            where: { name },
        });
    }
}
