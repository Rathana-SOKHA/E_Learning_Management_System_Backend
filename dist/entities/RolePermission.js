var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, } from "typeorm";
import { Role } from "./Role.js";
import { Permission } from "./Permission.js";
let RolePermission = class RolePermission {
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], RolePermission.prototype, "id", void 0);
__decorate([
    ManyToOne(() => Role, (role) => role.rolePermissions, {
        onDelete: "CASCADE",
    }),
    JoinColumn({
        name: "role_id",
    }),
    __metadata("design:type", Object)
], RolePermission.prototype, "role", void 0);
__decorate([
    ManyToOne(() => Permission, (permission) => permission.rolePermissions, {
        onDelete: "CASCADE",
    }),
    JoinColumn({
        name: "permission_id",
    }),
    __metadata("design:type", Object)
], RolePermission.prototype, "permission", void 0);
RolePermission = __decorate([
    Entity("role_permissions")
], RolePermission);
export { RolePermission };
