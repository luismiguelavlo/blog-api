import { Response, Request } from "express";
import { CustomError, LoginUserDto, RegisterUserDTO } from "../../domain";
import { UserService } from "../services/user.service";

export class UserController {
  constructor(private readonly userService: UserService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.log(error);
    return res.status(500).json({ message: "Something went very wrong! 🧨" });
  };

  login = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);

    if (error) return res.status(422).json({ message: error });

    this.userService
      .login(loginUserDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  register = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDTO.create(req.body);

    if (error) return res.status(422).json({ message: error });

    this.userService
      .register(registerUserDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };
}