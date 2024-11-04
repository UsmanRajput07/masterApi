import { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import path from 'node:path'
const createBook = async (req: Request, res: Response, next: NextFunction) => {
    // const { title, author, genre, file, coverImg } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    console.log("files", files)
    const coverImg = files.coverImg[0].mimetype.split("/").at(-1)
    const fileName = files.coverImg[0].filename
    const filepath = path.resolve(__dirname, `../../public/uploads`, fileName)

    // const uploadImg = await cloudinary.uploader.upload(filepath, {
    //     filename_override: fileName,
    //     folder: "bookCovers",
    //     format: coverImg
    // })
    // console.log("uploadImg", uploadImg)
    return res.json({ message: "Create book" });
}

export {
    createBook
}