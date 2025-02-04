"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const domain_1 = require("../../domain");
class UserController {
    constructor(userService) {
        this.userService = userService;
        this.handleError = (error, res) => {
            if (error instanceof domain_1.CustomError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            console.log(error);
            return res.status(500).json({ message: "Something went very wrong! 🧨" });
        };
        this.login = (req, res) => {
            const [error, loginUserDto] = domain_1.LoginUserDto.create(req.body);
            if (error)
                return res.status(422).json({ message: error });
            this.userService
                .login(loginUserDto)
                .then((data) => res.status(200).json(data))
                .catch((error) => this.handleError(error, res));
        };
        this.register = (req, res) => {
            const [error, registerUserDto] = domain_1.RegisterUserDTO.create(req.body);
            if (error)
                return res.status(422).json({ message: error });
            this.userService
                .register(registerUserDto, req.file)
                .then((data) => res.status(200).json(data))
                .catch((error) => this.handleError(error, res));
        };
        this.validateAccount = (req, res) => {
            const { token } = req.params;
            this.userService
                .validateEmail(token)
                .then((data) => res.status(200).json(data))
                .catch((error) => this.handleError(error, res));
        };
        this.getProfile = (req, res) => {
            this.userService
                .getUserProfile(req.body.sessionUser)
                .then((data) => res.status(200).json(data))
                .catch((error) => this.handleError(error, res));
        };
        this.blockAccount = (req, res) => {
            this.userService
                .blockAccount()
                .then((data) => res.status(200).json(data))
                .catch((error) => this.handleError(error, res));
        };
        this.findOneUser = (req, res) => {
            this.userService
                .findOneUser(req.params.id)
                .then((data) => res.status(200).json(data))
                .catch((error) => this.handleError(error, res));
        };
    }
}
exports.UserController = UserController;
