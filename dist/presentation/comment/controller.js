"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const domain_1 = require("../../domain");
class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
        this.handleError = (error, res) => {
            if (error instanceof domain_1.CustomError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            console.log(error);
            return res.status(500).json({ message: "Something went very wrong! 🧨" });
        };
        this.createComment = (req, res) => {
            const [error, createCommentDto] = domain_1.CreateCommentDTO.create(req.body);
            const user = req.body.sessionUser;
            if (error)
                return res.status(422).json({ message: error });
            this.commentService
                .createComment(createCommentDto, user)
                .then((data) => res.status(201).json(data))
                .catch((error) => this.handleError(error, res));
        };
        this.getAllComment = (req, res) => {
            this.commentService
                .findAllComents()
                .then((data) => res.status(200).json(data))
                .catch((error) => this.handleError(error, res));
        };
        this.updateComment = (req, res) => {
            this.commentService
                .updateComment()
                .then((data) => res.status(200).json(data))
                .catch((error) => this.handleError(error, res));
        };
        this.deleteComment = (req, res) => {
            const { id } = req.params;
            const sessionUserId = req.body.sessionUser.id;
            this.commentService
                .deleteComment(id, sessionUserId)
                .then((data) => res.status(204).json(data))
                .catch((error) => this.handleError(error, res));
        };
    }
}
exports.CommentController = CommentController;
