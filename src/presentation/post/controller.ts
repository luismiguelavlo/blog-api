import { Request, Response } from "express";

export class PostController {
  constructor() {}

  createPost = async (req: Request, res: Response) => {
    return res.status(201).json({
      message: "Post has been created",
    });
  };

  findAllPost = async (req: Request, res: Response) => {
    return res.status(200).json({
      message: "success",
    });
  };
}
