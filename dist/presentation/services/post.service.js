"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const data_1 = require("../../data");
const domain_1 = require("../../domain");
class PostService {
    constructor(userService) {
        this.userService = userService;
    }
    findAllPost() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield data_1.Post.find({
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
            }
            catch (error) {
                throw domain_1.CustomError.internalServer("Error obteniendo datos");
            }
        });
    }
    findOnePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield data_1.Post.findOne({
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
                throw domain_1.CustomError.notFoud("Post not found");
            }
            return post;
        });
    }
    createPost(postData) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = new data_1.Post();
            //necesito buscar el usuario
            const user = yield this.userService.findOneUser(postData.userId);
            post.title = postData.title;
            post.content = postData.content;
            post.user = user;
            try {
                return yield post.save();
            }
            catch (error) {
                throw domain_1.CustomError.internalServer("Error creating post");
            }
        });
    }
    updatePost(id, postData) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.findOnePost(id);
            post.title = postData.title.toLowerCase().trim();
            post.content = postData.content.trim();
            try {
                return yield post.save();
            }
            catch (error) {
                throw domain_1.CustomError.internalServer("Error updating post");
            }
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.findOnePost(id);
            post.status = false;
            try {
                post.save();
            }
            catch (error) {
                throw domain_1.CustomError.internalServer("Error deleting post");
            }
        });
    }
}
exports.PostService = PostService;
