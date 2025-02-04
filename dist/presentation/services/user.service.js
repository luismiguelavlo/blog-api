"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const config_1 = require("../../config");
const jwt_adapter_1 = require("../../config/jwt.adapter");
const data_1 = require("../../data");
const domain_1 = require("../../domain");
class UserService {
    constructor(emailService) {
        this.emailService = emailService;
        this.sendEmailValidationLink = (email) => __awaiter(this, void 0, void 0, function* () {
            const token = yield jwt_adapter_1.JwtAdapter.generateToken({ email }, "300s");
            if (!token)
                throw domain_1.CustomError.internalServer("Error getting token");
            const link = `http://${config_1.envs.WEBSERVICE_URL}/api/user/validate-email/${token}`;
            const html = `
      <h1>Validate your email</h1>
      <p>Click on the following link to validate your email</p>
      <a href="${link}">Validate your email: ${email}</a>
    `;
            const isSent = this.emailService.sendEmail({
                to: email,
                subject: "Validate your account",
                htmlBody: html,
            });
            if (!isSent)
                throw domain_1.CustomError.internalServer("Error sending email");
            return true;
        });
        this.validateEmail = (token) => __awaiter(this, void 0, void 0, function* () {
            const payload = yield jwt_adapter_1.JwtAdapter.validateToken(token);
            if (!payload)
                throw domain_1.CustomError.badRequest("Invalid Token");
            const { email } = payload;
            if (!email)
                throw domain_1.CustomError.internalServer("Email not in token");
            const user = yield data_1.User.findOne({ where: { email: email } });
            if (!user)
                throw domain_1.CustomError.internalServer("Email not exist");
            user.status = data_1.Status.ACTIVE;
            try {
                yield user.save();
                return {
                    message: "Usuario activado",
                };
            }
            catch (error) {
                throw domain_1.CustomError.internalServer("Something went very wrong");
            }
        });
    }
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            //1. buscar el usuario que se quiere loguear
            const user = yield this.findUserByEmail(credentials.email);
            //2. validar si la contraseña es correcta
            const isMatching = config_1.encriptAdapter.compare(credentials.password, user.password);
            if (!isMatching)
                throw domain_1.CustomError.unAuthorized("Invalid Credentials");
            //3. debemos generar un jwt
            const token = yield jwt_adapter_1.JwtAdapter.generateToken({ id: user.id }); //! IMPORTANTE RECORDAR QUE EL PAYLOAD DEL JWT VIENE CON EL ID DEL USUARIO QUE SE ESTA LOGUEANDO
            if (!token)
                throw domain_1.CustomError.internalServer("Error while creating JWT");
            //4.enviar la data al cliente
            return {
                token: token,
                user: {
                    id: user.id,
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    photo: user.photo,
                    birthdate: user.birthdate,
                },
            };
        });
    }
    register(userData, file) {
        return __awaiter(this, void 0, void 0, function* () {
            //guardar la data del usuario
            const user = new data_1.User();
            user.name = userData.name;
            user.surname = userData.surname;
            user.email = userData.email;
            user.password = userData.password;
            user.birthdate = userData.birthdate;
            if ((file === null || file === void 0 ? void 0 : file.originalname) && file.originalname.length > 0) {
                //TODO: SUBIR ESTO A LA NUBE
            }
            try {
                const dbUser = yield user.save();
                yield this.sendEmailValidationLink(dbUser.email);
                return {
                    id: dbUser.id,
                    name: dbUser.name,
                    surname: dbUser.surname,
                    email: dbUser.email,
                    photo: dbUser.photo,
                    birthdate: dbUser.birthdate,
                };
            }
            catch (error) {
                if (error.code === "23505") {
                    throw domain_1.CustomError.badRequest(`User with email: ${userData.email} already exist`);
                }
                throw domain_1.CustomError.internalServer("Error while creating user");
            }
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield data_1.User.findOne({
                where: {
                    email: email,
                    status: data_1.Status.ACTIVE,
                },
            });
            if (!user)
                throw domain_1.CustomError.notFoud(`User with email: ${email} not found`);
            return user;
        });
    }
    getUserProfile(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                birthdate: user.birthdate,
                photo: user.photo,
            };
        });
    }
    findOneUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_1.User.createQueryBuilder("user")
                .where("user.id = :id", { id: userId })
                .andWhere("user.status = :userStatus", { userStatus: data_1.Status.ACTIVE })
                .getOne();
            if (!result) {
                throw domain_1.CustomError.notFoud("User not found");
            }
            // const query = `SELECT * FROM "user" WHERE "id" = $1`;
            // const result = await User.query(query, [userId]);
            return result;
        });
    }
    blockAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            return "hola";
        });
    }
}
exports.UserService = UserService;
