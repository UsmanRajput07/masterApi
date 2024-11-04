import path from "node:path"
import multer from "multer";
import express from 'express';
import { createBook } from './bookControler';

const bookRouter = express.Router();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, "../../public/uploads"))
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }

// })

const upload = multer({
    // storage: storage,
    dest: path.resolve(__dirname, "../../public/uploads"),
    limits: {
        fileSize: 3e7
    }
})

// routes
bookRouter.post("/create", upload.fields([{
    name: "coverImg",
    maxCount: 1
}, {
    name: "file",
    maxCount: 1
}]), createBook);

export default bookRouter;