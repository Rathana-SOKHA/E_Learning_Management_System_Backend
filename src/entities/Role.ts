import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";

import { User } from "./User.js";
import { RolePermission } from "./RolePermission.js";

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 50,
    unique: true,
  })
  name!: string;

  // ✅ EXISTING (KEEP THIS)
  @OneToMany(() => User, (user) => user.role)
  users!: User[];

  // ✅ NEW (RBAC SYSTEM)
  @OneToMany(() => RolePermission, (rp) => rp.role)
  rolePermissions!: RolePermission[];
}
