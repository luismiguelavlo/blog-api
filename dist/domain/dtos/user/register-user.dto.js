"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserDTO = void 0;
const config_1 = require("../../../config");
class RegisterUserDTO {
    constructor(name, surname, email, password, birthdate) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.birthdate = birthdate;
    }
    static create(object) {
        const { name, surname, email, password, birthdate } = object;
        if (!name)
            return ["Missing name"];
        if (!surname)
            return ["Missing surname"];
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
        if (!birthdate)
            return ["Missing birthdate"];
        return [
            undefined,
            new RegisterUserDTO(name, surname, email, password, birthdate),
        ];
    }
}
exports.RegisterUserDTO = RegisterUserDTO;
