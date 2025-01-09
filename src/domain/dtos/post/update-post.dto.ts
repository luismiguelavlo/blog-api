export class UpdatePostDTO {
  constructor(public readonly title: string, public readonly content: string) {}

  static create(object: { [key: string]: any }): [string?, UpdatePostDTO?] {
    const { title, content } = object;

    if (!title) return ["Missing title"];
    if (title.length < 8) return ["The title must be at least 8 characters"];
    if (typeof title !== "string") ["The title must be a string"];

    if (!content) return ["Missing content"];
    if (content.length < 20)
      return ["The content must be at least 8 characters"];
    if (typeof content !== "string") ["The content must be a string"];
    const paragraphs = content
      .split(/\n+/)
      .filter((paragraph: string) => paragraph.trim().length > 0);
    if (paragraphs.length < 2)
      return ["The content must be at least 2 paragraphs"];

    return [undefined, new UpdatePostDTO(title, content)];
  }
}
