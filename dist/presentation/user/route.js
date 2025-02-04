"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const user_service_1 = require("../services/user.service");
const email_service_1 = require("../services/email.service");
const config_1 = require("../../config");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const data_1 = require("../../data");
const upload_files_adapter_1 = require("../../config/upload-files.adapter");
class UserRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const emailService = new email_service_1.EmailService(config_1.envs.MAILER_SERVICE, config_1.envs.MAILER_EMAIL, config_1.envs.MAILER_SECRET_KEY, config_1.envs.SEND_EMAIL);
        const userService = new user_service_1.UserService(emailService);
        const userController = new controller_1.UserController(userService);
        router.post("/login", userController.login);
        router.post("/register", (0, upload_files_adapter_1.uploadSingleFile)("photo"), userController.register);
        router.get("/validate-email/:token", userController.validateAccount);
        router.get("/information/:id", userController.findOneUser);
        router.use(auth_middleware_1.AuthMiddleware.protect);
        router.get("/profile", userController.getProfile);
        router.patch("/block-account/:id", auth_middleware_1.AuthMiddleware.restrictTo(data_1.UserRole.ADMIN, data_1.UserRole.MODERATOR), userController.blockAccount);
        return router;
    }
}
exports.UserRoutes = UserRoutes;
