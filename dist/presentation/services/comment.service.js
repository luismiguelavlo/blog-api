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
exports.CommentService = void 0;
const validate_owner_1 = require("../../config/validate-owner");
const data_1 = require("../../data");
const domain_1 = require("../../domain");
class CommentService {
    constructor(userService, postService) {
        this.userService = userService;
        this.postService = postService;
    }
    findAllComents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield data_1.Comment.createQueryBuilder("comment")
                    .where("comment.status = :commentStatus", { commentStatus: true })
                    .getMany();
                return comments;
            }
            catch (error) {
                throw domain_1.CustomError.internalServer("Error getting comment");
            }
        });
    }
    findOneComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield data_1.Comment.createQueryBuilder("comment")
                .leftJoinAndSelect("comment.user", "user")
                .where("comment.id = :commentId", { commentId: id })
                .andWhere("comment.status = :commentStatus", { commentStatus: true })
                .getOne();
            if (!comment)
                throw domain_1.CustomError.notFoud("Comment not found");
            return comment;
        });
    }
    createComment(comment, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.postService.findOnePost(comment.postId);
            try {
                yield data_1.Comment.createQueryBuilder("comment")
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
            }
            catch (error) {
                console.log(error);
                throw domain_1.CustomError.internalServer("Error creating Comment");
            }
        });
    }
    deleteComment(id, sessionUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.findOneComment(id);
            const isOwner = (0, validate_owner_1.protectAccountOwner)(comment.user.id, sessionUserId);
            if (!isOwner)
                throw domain_1.CustomError.unAuthorized("You are not the owner of this comment");
            comment.status = false;
            try {
                yield comment.save();
                return null;
            }
            catch (error) {
                throw domain_1.CustomError.internalServer("Error deleting comment");
            }
        });
    }
    updateComment() {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO: Validar acciones del dueño
            return {
                ok: true,
            };
        });
    }
}
exports.CommentService = CommentService;
