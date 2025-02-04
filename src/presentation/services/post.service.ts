import { envs } from "../../config/env";
import { UploadFilesCloud } from "../../config/upload-files-cloud.adapter";
import { Post } from "../../data";
import { CreatePostDTO, CustomError, UpdatePostDTO } from "../../domain";
import { UserService } from "./user.service";

export class PostService {
  constructor(public readonly userService: UserService) {}

  async findAllPost() {
    try {
      const posts = await Post.find({
        where: {
          status: true,
        },
        relations: ["user"],
        select: {
          user: {
            name: true,
            surname: true,
            photo: true,
          },
        },
      });

      const postsWithImgs = Promise.all(
        posts.map(async (post) => {
          const resolvedImgs = await Promise.all(
            (post.imgs ?? []).map(async (img) => {
              return await UploadFilesCloud.getFile({
                bucketName: envs.AWS_S3_BUCKET_NAME,
                key: img,
              });
            })
          );

          const userImages = await UploadFilesCloud.getFile({
            bucketName: envs.AWS_S3_BUCKET_NAME,
            key: post.user.photo,
          });

          return {
            ...post,
            imgs: resolvedImgs,
            user: {
              ...post.user,
              photo: userImages,
            },
          };
        })
      );

      return postsWithImgs;
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer("Error obteniendo datos");
    }
  }

  async findOnePost(id: string) {
    const post = await Post.findOne({
      where: {
        id,
        status: true,
      },
      relations: ["user", "comments", "comments.user"],
      select: {
        user: {
          name: true,
          surname: true,
          photo: true,
        },
        comments: {
          id: true,
          content: true,
          created_at: true,
          user: {
            name: true,
            surname: true,
            photo: true,
          },
        },
      },
    });

    if (!post) {
      throw CustomError.notFoud("Post not found");
    }

    return post;
  }

  async createPost(postData: CreatePostDTO, imgs?: Express.Multer.File[]) {
    const post = new Post();
    let keys: string[] = [];
    let urls: string[] = [];

    //necesito buscar el usuario
    const user = await this.userService.findOneUser(postData.userId);

    if (imgs && imgs.length > 0) {
      const keysPromises = imgs.map(async (img) => {
        return await UploadFilesCloud.uploadSingleFile({
          bucketName: envs.AWS_S3_BUCKET_NAME,
          key: `posts/${Date.now()}-${img.originalname}`,
          body: img.buffer,
          contentType: img.mimetype,
        });
      });

      keys = await Promise.all(keysPromises);
    }

    post.title = postData.title;
    post.content = postData.content;
    post.user = user;

    if (keys && keys.length > 0) {
      post.imgs = keys;
      urls = await Promise.all(
        keys.map(async (key) => {
          return await UploadFilesCloud.getFile({
            bucketName: envs.AWS_S3_BUCKET_NAME,
            key,
          });
        })
      );
    }

    try {
      const postSaved = await post.save();
      postSaved.imgs = urls;
      return postSaved;
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
