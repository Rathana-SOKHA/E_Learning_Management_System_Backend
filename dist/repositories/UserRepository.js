import { AppDataSource } from "../config/data-source.js";
import { User } from "../entities/User.js";
export class UserRepository {
    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }
    async findByEmail(email) {
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
    async findById(id) {
        return this.repository.findOne({
            where: { id },
            relations: {
                role: true,
            },
        });
    }
    async createUser(data) {
        const user = this.repository.create(data);
        return this.repository.save(user);
    }
}
