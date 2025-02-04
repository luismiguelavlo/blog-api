"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultipleFiles = exports.uploadSingleFile = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
/*const upload = multer({ storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (request, file, cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error("Invalid file type"));
    }
} });*/
const upload = (0, multer_1.default)({ storage });
const uploadSingleFile = (fileName) => upload.single(fileName);
exports.uploadSingleFile = uploadSingleFile;
const uploadMultipleFiles = (fileName, maxFileNumber) => upload.array(fileName, maxFileNumber);
exports.uploadMultipleFiles = uploadMultipleFiles;
