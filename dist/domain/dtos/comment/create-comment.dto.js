"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommentDTO = void 0;
const config_1 = require("../../../config");
class CreateCommentDTO {
    constructor(content, postId) {
        this.content = content;
        this.postId = postId;
    }
    static create(object) {
        const offensiveWords = ["badword1", "badword2", "badword3"];
        const { content, postId } = object;
        if (!content || typeof content !== "string")
            return ["Content is required and must be a string."];
        const containsOffensiveWords = offensiveWords.some((word) => new RegExp(`\\b${word}\\b`, "i").test(content));
        if (containsOffensiveWords)
            return ["Content contains offensive words."];
        if (!postId ||
            typeof postId !== "string" ||
            !config_1.regularExp.uuid.test(postId)) {
            return ["Invalid postId format, must be a UUID"];
        }
        return [undefined, new CreateCommentDTO(content, postId)];
    }
}
exports.CreateCommentDTO = CreateCommentDTO;
