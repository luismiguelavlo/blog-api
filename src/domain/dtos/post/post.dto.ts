import { regularExp } from "../../../config";

export class CreatePostDTO {
  constructor(
    public readonly title: string,
    public readonly content: string,
    public readonly userId: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreatePostDTO?] {
    const { title, content, userId } = object;

    if (!title) return ["Missing title", undefined];
    if (title.length <= 5) return ["The title must be at least 5 characters"];
    if (!content) return ["Missing content"];
    if (content.length <= 10)
      return ["The content must be at least 10 characters"];
    if (
      !userId ||
      typeof userId !== "string" ||
      !regularExp.uuid.test(userId)
    ) {
      return ["Invalid userId format, must be a UUID"];
    }

    //si la ejecucion llega a este punto significa que todo esta bien
    return [undefined, new CreatePostDTO(title, content, userId)];
  }
}
