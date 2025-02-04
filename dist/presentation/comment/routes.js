"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const comment_service_1 = require("../services/comment.service");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const email_service_1 = require("../services/email.service");
const config_1 = require("../../config");
const user_service_1 = require("../services/user.service");
const post_service_1 = require("../services/post.service");
class CommentRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const emailService = new email_service_1.EmailService(config_1.envs.MAILER_SERVICE, config_1.envs.MAILER_EMAIL, config_1.envs.MAILER_SECRET_KEY, config_1.envs.SEND_EMAIL);
        const userService = new user_service_1.UserService(emailService);
        const postService = new post_service_1.PostService(userService);
        const commentService = new comment_service_1.CommentService(userService, postService);
        const commentController = new controller_1.CommentController(commentService);
        router.use(auth_middleware_1.AuthMiddleware.protect);
        router
            .route("/")
            .get(commentController.getAllComment)
            .post(commentController.createComment);
        router
            .route("/:id")
            .patch(commentController.updateComment)
            .delete(commentController.deleteComment);
        return router;
    }
}
exports.CommentRoutes = CommentRoutes;
