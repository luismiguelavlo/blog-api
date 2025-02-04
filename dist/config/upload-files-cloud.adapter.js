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
exports.UploadFilesCloud = void 0;
const firebase_adapter_1 = require("./firebase.adapter");
class UploadFilesCloud {
    static uploadSingleFile(path, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const imgRef = firebase_adapter_1.utilsFirebase.ref(firebase_adapter_1.utilsFirebase.storage, path);
            yield firebase_adapter_1.utilsFirebase.uploadBytes(imgRef, data);
            return yield firebase_adapter_1.utilsFirebase.getDownloadURL(imgRef);
        });
    }
}
exports.UploadFilesCloud = UploadFilesCloud;
