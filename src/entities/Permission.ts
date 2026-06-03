import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RolePermission } from "./RolePermission.js";

@Entity("permissions")
export class Permission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    unique: true,
  })
  name!: string;

  @OneToMany(() => RolePermission, (rp) => rp.permission)
  rolePermissions!: RolePermission[];
}
