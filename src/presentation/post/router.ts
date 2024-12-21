import { Router } from "express";

export class PostRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/saludar", (req, res) => {
      return res.status(200).json({
        message: "Hola chicos!!!",
      });
    });

    router.get("/dar-descanso", (req, res) => {
      return res.status(200).json({
        message: "Los engañe hoy no hay otro descanso jaja! sin tomates",
      });
    });

    return router;
  }
}
