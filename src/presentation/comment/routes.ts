import { Router } from "express";
import { CommentController } from "./controller";
import { CommentService } from "../services/comment.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { EmailService } from "../services/email.service";
import { envs } from "../../config";
import { UserService } from "../services/user.service";
import { PostService } from "../services/post.service";

export class CommentRoutes {
  static get routes(): Router {
    const router = Router();

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL
    );
    const userService = new UserService(emailService);
    const postService = new PostService(userService);

    const commentService = new CommentService(userService, postService);
    const commentController = new CommentController(commentService);

    router.use(AuthMiddleware.protect);

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
