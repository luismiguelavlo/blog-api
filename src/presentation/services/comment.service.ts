import { protectAccountOwner } from "../../config/validate-owner";
import { Comment, User } from "../../data";
import { CreateCommentDTO, CustomError } from "../../domain";
import { PostService } from "./post.service";
import { UserService } from "./user.service";

export class CommentService {
  constructor(
    public readonly userService: UserService,
    public readonly postService: PostService
  ) {}

  async findAllComents() {
    try {
      const comments = await Comment.createQueryBuilder("comment")
        .where("comment.status = :commentStatus", { commentStatus: true })
        .getMany();

      return comments;
    } catch (error) {
      throw CustomError.internalServer("Error getting comment");
    }
  }

  async findOneComment(id: string) {
    const comment = await Comment.createQueryBuilder("comment")
      .leftJoinAndSelect("comment.user", "user")
      .where("comment.id = :commentId", { commentId: id })
      .andWhere("comment.status = :commentStatus", { commentStatus: true })
      .getOne();

    if (!comment) throw CustomError.notFoud("Comment not found");

    return comment;
  }

  async createComment(comment: CreateCommentDTO, user: User) {
    const post = await this.postService.findOnePost(comment.postId);

    try {
      await Comment.createQueryBuilder("comment")
        .insert()
        .values({
          content: comment.content,
          user: user,
          post: post,
        })
        .execute();

      return {
        message: "Comentario creado correctamente",
      };
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer("Error creating Comment");
    }
  }

  async deleteComment(id: string, sessionUserId: string) {
    const comment = await this.findOneComment(id);

    const isOwner = protectAccountOwner(comment.user.id, sessionUserId);
    if (!isOwner)
      throw CustomError.unAuthorized("You are not the owner of this comment");

    comment.status = false;

    try {
      await comment.save();

      return null;
    } catch (error) {
      throw CustomError.internalServer("Error deleting comment");
    }
  }

  async updateComment() {
    //TODO: Validar acciones del dueño
    return {
      ok: true,
    };
  }
}
