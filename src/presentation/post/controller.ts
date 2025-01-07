import { Request, Response } from "express";
import { PostService } from "../services/post.service";

export class PostController {
  constructor(private readonly postService: PostService) {}

  createPost = async (req: Request, res: Response) => {
    this.postService
      .createPost(req.body)
      .then((data: any) => {
        return res.status(201).json(data);
      })
      .catch((error: any) => {
        return res.status(500).json({
          message: "Internal Server Error",
          error,
        });
      });
  };

  findAllPost = async (req: Request, res: Response) => {
    this.postService
      .findAllPost()
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Internal Server Error",
          error,
        });
      });
  };

  findOnePost = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.postService
      .findOnePost(id)
      .then((data: any) => {
        res.status(200).json(data);
      })
      .catch((error: any) => {
        res.status(500).json({
          message: "Internal Server Error",
          error,
        });
      });
  };
}
