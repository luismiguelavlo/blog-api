"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
    static badRequest(message) {
        return new CustomError(message, 400);
    } //400
    static unAuthorized(message) {
        return new CustomError(message, 401);
    }
    static forbiden(message) {
        return new CustomError(message, 403);
    }
    static notFoud(message) {
        return new CustomError(message, 404);
    }
    static internalServer(message) {
        return new CustomError(message, 500);
    }
}
exports.CustomError = CustomError;
