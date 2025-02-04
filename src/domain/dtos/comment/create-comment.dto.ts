import { regularExp } from "../../../config";

export class CreateCommentDTO {
  constructor(public content: string, public postId: string) {}

  static create(object: { [key: string]: any }): [string?, CreateCommentDTO?] {
    const offensiveWords = ["badword1", "badword2", "badword3"];

    const { content, postId } = object;

    if (!content || typeof content !== "string")
      return ["Content is required and must be a string."];

    const containsOffensiveWords = offensiveWords.some((word) =>
      new RegExp(`\\b${word}\\b`, "i").test(content)
    );
    if (containsOffensiveWords) return ["Content contains offensive words."];

    if (
      !postId ||
      typeof postId !== "string" ||
      !regularExp.uuid.test(postId)
    ) {
      return ["Invalid postId format, must be a UUID"];
    }

    return [undefined, new CreateCommentDTO(content, postId)];
  }
}
