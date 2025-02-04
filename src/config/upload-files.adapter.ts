import multer from "multer";

const storage = multer.memoryStorage();

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

const upload = multer({ storage });

export const uploadSingleFile = (fileName: string) => upload.single(fileName);

export const uploadMultipleFiles = (fileName: string, maxFileNumber: number) =>
  upload.array(fileName, maxFileNumber);
