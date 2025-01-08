import { Post } from "../../data";
import { CreatePostDTO } from "../../domain";

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
    const post = await Post.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  }

  async createPost(postData: CreatePostDTO) {
    const post = new Post();

    post.title = postData.title;
    post.content = postData.content;

    try {
      return await post.save();
    } catch (error) {
      throw new Error("Error creando el post");
    }
  }

  async updatePost(id: string, postData: any) {
    const post = await this.findOnePost(id);

    post.title = postData.title.toLowerCase().trim();
    post.content = postData.content.trim();

    try {
      return await post.save();
    } catch (error) {
      throw new Error("Error actualizando el post");
    }
  }

  async deletePost(id: string) {
    const post = await this.findOnePost(id);

    post.status = false;

    try {
      post.save();
    } catch (error) {
      throw new Error("Error al eliminar el post...");
    }
  }
}
