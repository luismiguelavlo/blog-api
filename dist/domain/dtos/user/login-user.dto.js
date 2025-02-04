"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDto = void 0;
const config_1 = require("../../../config");
class LoginUserDto {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    static create(object) {
        const { email, password } = object;
        if (!email)
            return ["Missing email"];
        if (!config_1.regularExp.email.test(email))
            return ["Invalid Email"];
        if (!password)
            return ["Missing password"];
        if (!config_1.regularExp.password.test(password))
            return [
                "The password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, and one special character ",
            ];
        return [undefined, new LoginUserDto(email, password)];
    }
}
exports.LoginUserDto = LoginUserDto;
