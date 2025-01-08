export class CreatePostDTO {
  constructor(public readonly title: string, public readonly content: string) {}

  static create(object: { [key: string]: any }): [string?, CreatePostDTO?] {
    const { title, content } = object;

    if (!title) return ["Missing title", undefined];
    if (title.length <= 5) return ["The title must be at least 5 characters"];
    if (!content) return ["Missing content"];
    if (content.length <= 10)
      return ["The content must be at least 10 characters"];

    //si la ejecucion llega a este punto significa que todo esta bien
    return [undefined, new CreatePostDTO(title, content)];
  }
}
