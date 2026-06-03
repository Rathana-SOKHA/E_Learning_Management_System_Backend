import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Relation,
} from "typeorm";

import { Role } from "./Role.js";
import { Permission } from "./Permission.js";

@Entity("role_permissions")
export class RolePermission {
  @PrimaryGeneratedColumn()
  id!: number;

  // Role relationship
  @ManyToOne(() => Role, (role) => role.rolePermissions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "role_id",
  })
  role!: Relation<Role>;

  // Permission relationship
  @ManyToOne(() => Permission, (permission) => permission.rolePermissions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "permission_id",
  })
  permission!: Relation<Permission>;
}
