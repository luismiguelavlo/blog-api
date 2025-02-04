"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = exports.Status = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("../../../config");
const post_model_1 = require("./post.model");
const comment_model_1 = require("./comment.model");
var Status;
(function (Status) {
    Status["ACTIVE"] = "ACTIVE";
    Status["INACTIVE"] = "INACTIVE";
    Status["DELETED"] = "DELETED";
})(Status || (exports.Status = Status = {}));
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["MODERATOR"] = "MODERATOR";
    UserRole["USER"] = "USER";
})(UserRole || (exports.UserRole = UserRole = {}));
let User = class User extends typeorm_1.BaseEntity {
    encryptedPassword() {
        this.password = config_1.encriptAdapter.hash(this.password);
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        length: 100,
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        length: 80,
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "surname", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        length: 80,
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)("date", {
        nullable: false,
    }),
    __metadata("design:type", Date)
], User.prototype, "birthdate", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        enum: UserRole,
        default: UserRole.USER,
    }),
    __metadata("design:type", String)
], User.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        enum: Status,
        default: Status.INACTIVE,
    }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_model_1.Post, (post) => post.user),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_model_1.Comment, (comment) => comment.user),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "encryptedPassword", null);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
