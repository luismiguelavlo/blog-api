import { Request, Response } from "express";
import { PostService } from "../services/post.service";
import { CreatePostDTO } from "../../domain";

export class PostController {
  constructor(private readonly postService: PostService) {}

  createPost = (req: Request, res: Response) => {
    const [error, createPostDto] = CreatePostDTO.create(req.body);

    if (error) return res.status(422).json({ message: error });

    this.postService
      .createPost(createPostDto!)
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

  findAllPost = (req: Request, res: Response) => {
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

  findOnePost = (req: Request, res: Response) => {
    const { id } = req.params;

    this.postService
      .findOnePost(id)
      .then((data: any) => {
        res.status(200).json(data);
      })
      .catch((error: any) => {
        res.status(500).json({
          message: "Internal Server Error!!!",
          error,
        });
      });
  };

  updatePost = (req: Request, res: Response) => {
    const { id } = req.params;

    this.postService
      .updatePost(id, req.body)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        res.status(500).json({
          message: "Internal Server Error!!!",
          error,
        });
      });
  };

  deletePost = (req: Request, res: Response) => {
    const { id } = req.params;

    this.postService
      .deletePost(id)
      .then(() => {
        return res.status(204).json(null);
      })
      .catch((error) => {
        res.status(500).json({
          message: "Internal Server Error!!!",
          error,
        });
      });
  };
}
