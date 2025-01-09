import { Post } from "../../data";
import { CreatePostDTO, CustomError, UpdatePostDTO } from "../../domain";

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
      throw CustomError.internalServer("Error obteniendo datos");
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
      throw CustomError.notFoud("Post not found");
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
      throw CustomError.internalServer("Error creating post");
    }
  }

  async updatePost(id: string, postData: UpdatePostDTO) {
    const post = await this.findOnePost(id);
    post.title = postData.title.toLowerCase().trim();
    post.content = postData.content.trim();
    try {
      return await post.save();
    } catch (error) {
      throw CustomError.internalServer("Error updating post");
    }
  }

  async deletePost(id: string) {
    const post = await this.findOnePost(id);

    post.status = false;

    try {
      post.save();
    } catch (error) {
      throw CustomError.internalServer("Error deleting post");
    }
  }
}
