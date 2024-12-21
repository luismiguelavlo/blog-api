import { Router } from "express";
import { PostRoutes } from "./post/router";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/post", PostRoutes.routes);
    //userRoutes
    //comentsRoutes

    return router;
  }
}
