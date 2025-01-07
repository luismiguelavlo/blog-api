import { Post } from "../../data";

export class PostService {
  constructor() {}

  async findAllPost() {
    try {
      return await Post.find({
        where: {
          status: true,
        },
      });
    } catch (error) {
      throw new Error("Error obteniendo Post");
    }
  }

  async findOnePost(id: string) {
    try {
      return await Post.findOne({
        where: {
          id,
          status: true,
        },
      });
    } catch (error) {
      throw new Error("Error obteniendo Post");
    }
  }

  async createPost(postData: any) {
    const post = new Post();

    post.title = postData.title;
    post.content = postData.content;

    try {
      return await post.save();
    } catch (error) {
      throw new Error("Error creando el post");
    }
  }
}
