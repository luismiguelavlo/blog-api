import { Request, Response } from "express";
import { CreateCommentDTO, CustomError } from "../../domain";
import { CommentService } from "../services/comment.service";

export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.log(error);
    return res.status(500).json({ message: "Something went very wrong! 🧨" });
  };

  createComment = (req: Request, res: Response) => {
    const [error, createCommentDto] = CreateCommentDTO.create(req.body);
    const user = req.body.sessionUser;

    if (error) return res.status(422).json({ message: error });

    this.commentService
      .createComment(createCommentDto!, user)
      .then((data) => res.status(201).json(data))
      .catch((error: unknown) => this.handleError(error, res));
  };

  getAllComment = (req: Request, res: Response) => {
    this.commentService
      .findAllComents()
      .then((data) => res.status(200).json(data))
      .catch((error: unknown) => this.handleError(error, res));
  };

  updateComment = (req: Request, res: Response) => {
    this.commentService
      .updateComment()
      .then((data) => res.status(200).json(data))
      .catch((error: unknown) => this.handleError(error, res));
  };

  deleteComment = (req: Request, res: Response) => {
    const { id } = req.params;
    const sessionUserId = req.body.sessionUser.id;

    this.commentService
      .deleteComment(id, sessionUserId)
      .then((data) => res.status(204).json(data))
      .catch((error: unknown) => this.handleError(error, res));
  };
}
