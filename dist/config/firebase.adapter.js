"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilsFirebase = void 0;
const app_1 = require("firebase/app");
const env_1 = require("./env");
const storage_1 = require("firebase/storage");
const firebaseConfig = {
    apiKey: env_1.envs.FIREBASE_API_KEY,
    projectId: env_1.envs.FIREBASE_PROJECT_ID,
    storageBucket: env_1.envs.FIREBASE_STORAGE_BUCKET,
    appId: env_1.envs.FIREBASE_APP_ID,
};
const firebaseApp = (0, app_1.initializeApp)(firebaseConfig);
const storage = (0, storage_1.getStorage)(firebaseApp);
exports.utilsFirebase = {
    storage,
    ref: storage_1.ref,
    uploadBytes: storage_1.uploadBytes,
    getDownloadURL: storage_1.getDownloadURL,
};
