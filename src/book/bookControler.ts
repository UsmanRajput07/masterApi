import { NextFunction, Request, Response } from 'express';
import cloudinary from '../config/cloudinary';
import path from 'node:path';
import createHttpError from 'http-errors';
import bookModal from './bookModal';
import { AuthRequest } from '../middlewears/authenticate';
const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const fileName = files.coverImg[0].filename;
  const coverImg = files.coverImg[0].mimetype.split('/').at(-1);
  const filepath = path.resolve(__dirname, '../../public/uploads', fileName);

  //  upload pdf
  const bookFileName = files.file[0].filename;
  const bookFile = files.file[0].mimetype.split('/').at(-1);
  const bookFilepath = path.resolve(
    __dirname,
    '../../public/uploads',
    bookFileName,
  );

  try {
    const uploadImg = await cloudinary.uploader.upload(filepath, {
      filename_override: fileName,
      folder: 'bookCovers',
      format: coverImg,
    });
    const uploadPdf = await cloudinary.uploader.upload(bookFilepath, {
      resource_type: 'raw',
      filename_override: bookFileName,
      folder: 'books',
      format: bookFile,
    });
    const _req = req as AuthRequest;
    const createBook = await bookModal?.create({
      title: req.body.title,
      author: _req.userId,
      genre: req.body.genre,
      file: uploadPdf.secure_url,
      coverImg: uploadImg.secure_url,
    });
    res.json({
      message: 'book created',
      bookId: createBook?._id,
    });
  } catch (err) {
    return next(createHttpError(500, 'Error while uploading image'));
  }
};

export { createBook };
