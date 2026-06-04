import { AppDataSource } from "../config/data-source.js";

import { Role } from "../entities/Role.js";
import { Permission } from "../entities/Permission.js";
import { RolePermission } from "../entities/RolePermission.js";
import { User } from "../entities/User.js";
import { hashPassword } from "../utils/hashPassword.js";

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
  "enroll_course",
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
      "enroll_course"
    ],
  },
  {
    name: "STUDENT",
    permissions: ["enroll_course", "view_course", "take_quiz"],
  },
];

const testUsers = [
  {
    full_name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "ADMIN",
  },
  {
    full_name: "John Teacher",
    email: "teacher@example.com",
    password: "teacher123",
    role: "TEACHER",
  },
  {
    full_name: "Jane Student",
    email: "student@example.com",
    password: "student123",
    role: "STUDENT",
  },
];

export const seed = async () => {
  await AppDataSource.initialize();

  const roleRepo = AppDataSource.getRepository(Role);
  const permRepo = AppDataSource.getRepository(Permission);
  const rolePermRepo = AppDataSource.getRepository(RolePermission);
  const userRepo = AppDataSource.getRepository(User);

  console.log("🌱 Seeder started");

   // 1. CREATE PERMISSIONS FIRST
   const permissionMap: Record<string, Permission> = {};

   for (const name of permissionsList) {
     let perm = await permRepo.findOne({ where: { name } });

     if (!perm) {
       perm = await permRepo.save(
         permRepo.create({ name })
       );
     }

     permissionMap[name] = perm;
   }

   console.log("Permission map keys:", Object.keys(permissionMap));

  // 2. CREATE ROLES
  const roleMap: Record<string, Role> = {};
  for (const roleData of roles) {
    let role = await roleRepo.findOne({
      where: { name: roleData.name },
    });

    if (!role) {
      role = await roleRepo.save(
        roleRepo.create({ name: roleData.name })
      );
    }

    roleMap[roleData.name] = role;

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
        await rolePermRepo.save(
          rolePermRepo.create({
            role,
            permission,
          })
        );
      }
    }
  }

  console.log("✅ Roles and Permissions created");

  // 4. CREATE TEST USERS
  for (const userData of testUsers) {
    const existingUser = await userRepo.findOne({
      where: { email: userData.email },
    });

    if (!existingUser) {
      const hashedPassword = await hashPassword(userData.password);
      const role = roleMap[userData.role];

      const user = userRepo.create({
        full_name: userData.full_name,
        email: userData.email,
        password: hashedPassword,
        role,
      });

      await userRepo.save(user);
      console.log(`✅ User created: ${userData.email} (${userData.role})`);
    } else {
      console.log(`⏭️  User already exists: ${userData.email}`);
    }
  }

  console.log("✅ Seeder completed");
  console.log("\n📋 Test Users Created:");
  console.log("┌─────────────────────────────────────┐");
  for (const user of testUsers) {
    console.log(`├ Email: ${user.email}`);
    console.log(`│ Password: ${user.password}`);
    console.log(`│ Role: ${user.role}`);
    console.log("├─────────────────────────────────────┤");
  }
  console.log("└─────────────────────────────────────┘");

  process.exit(0);
};

seed();