import { Router } from "express";
import { PostRoutes } from "./post/router";
import { UserRoutes } from "./user/route";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/post", PostRoutes.routes);
    router.use("/api/user", UserRoutes.routes);
    //comentsRoutes

    return router;
  }
}
