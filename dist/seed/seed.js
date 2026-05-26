import { AppDataSource } from "../config/data-source.js";
import { Role } from "../entities/Role.js";
import { Permission } from "../entities/Permission.js";
import { RolePermission } from "../entities/RolePermission.js";
const permissionsList = [
    "create_course",
    "edit_course",
    "delete_course",
    "view_course",
    "create_lesson",
    "edit_lesson",
    "create_quiz",
    "take_quiz",
    "manage_users",
];
const roles = [
    {
        name: "ADMIN",
        permissions: permissionsList,
    },
    {
        name: "TEACHER",
        permissions: [
            "create_course",
            "edit_course",
            "view_course",
            "create_lesson",
            "edit_lesson",
            "create_quiz",
        ],
    },
    {
        name: "STUDENT",
        permissions: ["view_course", "take_quiz"],
    },
];
export const seed = async () => {
    await AppDataSource.initialize();
    const roleRepo = AppDataSource.getRepository(Role);
    const permRepo = AppDataSource.getRepository(Permission);
    const rolePermRepo = AppDataSource.getRepository(RolePermission);
    console.log("🌱 Seeder started");
    // 1. CREATE PERMISSIONS FIRST
    const permissionMap = {};
    for (const name of permissionsList) {
        let perm = await permRepo.findOne({ where: { name } });
        if (!perm) {
            perm = await permRepo.save(permRepo.create({ name }));
        }
        permissionMap[name] = perm;
    }
    // 2. CREATE ROLES
    for (const roleData of roles) {
        let role = await roleRepo.findOne({
            where: { name: roleData.name },
        });
        if (!role) {
            role = await roleRepo.save(roleRepo.create({ name: roleData.name }));
        }
        // 3. LINK ROLE ↔ PERMISSION
        for (const permName of roleData.permissions) {
            const permission = permissionMap[permName];
            const exists = await rolePermRepo.findOne({
                where: {
                    role: { id: role.id },
                    permission: { id: permission.id },
                },
                relations: {
                    role: true,
                    permission: true,
                },
            });
            if (!exists) {
                await rolePermRepo.save(rolePermRepo.create({
                    role,
                    permission,
                }));
            }
        }
    }
    console.log("✅ Seeder completed");
    process.exit(0);
};
seed();
