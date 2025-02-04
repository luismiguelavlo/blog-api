import { Router } from "express";
import { PostRoutes } from "./post/router";
import { UserRoutes } from "./user/route";
import { CommentRoutes } from "./comment/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.post("/health-check", () => {
      return {
        ok: true,
      };
    });
    router.use("/api/post", PostRoutes.routes);
    router.use("/api/user", UserRoutes.routes);
    router.use("/api/comment", CommentRoutes.routes);

    return router;
  }
}
