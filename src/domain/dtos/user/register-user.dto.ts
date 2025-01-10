import { regularExp } from "../../../config";

export class RegisterUserDTO {
  constructor(
    public name: string,
    public surname: string,
    public email: string,
    public password: string,
    public birthdate: Date
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDTO?] {
    const { name, surname, email, password, birthdate } = object;

    if (!name) return ["Missing name"];
    if (!surname) return ["Missing surname"];
    if (!email) return ["Missing email"];
    if (!regularExp.email.test(email)) return ["Invalid Email"];
    if (!password) return ["Missing password"];
    if (!regularExp.password.test(password))
      return [
        "The password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, and one special character ",
      ];
    if (!birthdate) return ["Missing birthdate"];

    return [
      undefined,
      new RegisterUserDTO(name, surname, email, password, birthdate),
    ];
  }
}
