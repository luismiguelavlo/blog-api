import { Router } from "express";
import { PostController } from "./controller";
import { PostService } from "../services/post.service";
import { UserService } from "../services/user.service";
import { EmailService } from "../services/email.service";
import { envs } from "../../config";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { uploadMultipleFiles } from "../../config/upload-files.adapter";

export class PostRoutes {
  static get routes(): Router {
    const router = Router();

    //instanciamos el servicio para pasarselo por DI al controlador

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL
    );
    const userService = new UserService(emailService);
    const postService = new PostService(userService);
    const postController = new PostController(postService);

    router.use(AuthMiddleware.protect);
    router.get("/", postController.findAllPost);
    router.post("/", uploadMultipleFiles("imgs", 3), postController.createPost);
    router.get("/:id", postController.findOnePost);
    router.patch("/:id", postController.updatePost);
    router.delete("/:id", postController.deletePost);

    return router;
  }
}
