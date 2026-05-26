import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { Role } from "./Role.js";
import { Permission } from "./Permission.js";

@Entity("role_permissions")
export class RolePermission {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Role, role => role.rolePermissions)
  role!: Role;

  @ManyToOne(() => Permission, p => p.rolePermissions)
  permission!: Permission;
}