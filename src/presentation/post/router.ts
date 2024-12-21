import { Router } from "express";
import { PostController } from "./controller";

export class PostRoutes {
  static get routes(): Router {
    const router = Router();
    const postController = new PostController();

    router.get("/", postController.findAllPost);
    router.post("/", postController.createPost);

    return router;
  }
}
