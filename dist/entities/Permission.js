var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, } from "typeorm";
import { RolePermission } from "./RolePermission.js";
let Permission = class Permission {
    id;
    name;
    rolePermissions;
};
__decorate([
    PrimaryGeneratedColumn()
], Permission.prototype, "id", void 0);
__decorate([
    Column({
        type: "varchar",
        unique: true,
    })
], Permission.prototype, "name", void 0);
__decorate([
    OneToMany(() => RolePermission, (rp) => rp.permission)
], Permission.prototype, "rolePermissions", void 0);
Permission = __decorate([
    Entity("permissions")
], Permission);
export { Permission };
