import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Relation,
} from "typeorm";

import { User } from "./User.js";
import { RolePermission } from "./RolePermission.js";

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "varchar",
    length: 50,
    unique: true,
  })
  name!: string;

  // 👤 Role -> Users
  @OneToMany(() => User, (user) => user.role)
  users!: Relation<User[]>;

  // 🔐 Role -> RolePermissions
  @OneToMany(
    () => RolePermission,
    (rp) => rp.role
  )
  rolePermissions!: Relation<RolePermission[]>;
}