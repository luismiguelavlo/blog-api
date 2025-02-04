"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostDTO = void 0;
const config_1 = require("../../../config");
class CreatePostDTO {
    constructor(title, content, userId) {
        this.title = title;
        this.content = content;
        this.userId = userId;
    }
    static create(object) {
        const { title, content, userId } = object;
        if (!title)
            return ["Missing title", undefined];
        if (title.length <= 5)
            return ["The title must be at least 5 characters"];
        if (!content)
            return ["Missing content"];
        if (content.length <= 10)
            return ["The content must be at least 10 characters"];
        if (!userId ||
            typeof userId !== "string" ||
            !config_1.regularExp.uuid.test(userId)) {
            return ["Invalid userId format, must be a UUID"];
        }
        //si la ejecucion llega a este punto significa que todo esta bien
        return [undefined, new CreatePostDTO(title, content, userId)];
    }
}
exports.CreatePostDTO = CreatePostDTO;
