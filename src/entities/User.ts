import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Role } from "./Role.js";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  full_name!: string;

  @Column({
    type: "varchar",
    unique: true,
  })
  email!: string;

  @Column({
    type: "varchar",
  })
  password!: string;

  @ManyToOne(() => Role)
  @JoinColumn({
    name: "role_id",
  })
  role!: Role;
}


// refresh token
// @Column({
//   type: "text",
//   nullable: true,
// })
// refresh_token!: string;