import { NextFunction, Request, Response } from 'express';
import cloudinary from '../config/cloudinary';
import path from 'node:path';
import fs from 'node:fs';
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
    await fs.promises.unlink(filepath);
    const uploadPdf = await cloudinary.uploader.upload(bookFilepath, {
      resource_type: 'raw',
      filename_override: bookFileName,
      folder: 'books',
      format: bookFile,
    });
    await fs.promises.unlink(bookFilepath);
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

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, genre } = req.body;
  const bookId = req.params?.bookId;

  try {
    const book = await bookModal.findOne({ _id: bookId });

    if (!book) {
      return next(createHttpError(404, 'book not found'));
    }
    const _req = req as AuthRequest;
    if (book.author.toString() !== _req.userId) {
      return next(createHttpError(403, 'You do not have access this source'));
    }
    // check accsess
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    let coverImgUrl = '';
    if (files.coverImg) {
      const fileName = files.coverImg[0]?.filename;
      const type = files?.coverImg[0]?.mimetype?.split('/').at(-1);
      const filePath = path.resolve(
        __dirname,
        '../../public/uploads',
        fileName,
      );
      const coverImg = await cloudinary.uploader?.upload(filePath, {
        filename_override: fileName,
        folder: 'bookCovers',
        format: type,
      });
      coverImgUrl = coverImg?.secure_url;
      await fs.promises.unlink(filePath);
    }
    let pdfUrl = '';
    if (files.files) {
      const bookFileName = files.file[0].filename;
      const bookFile = files.file[0].mimetype.split('/').at(-1);
      const bookFilepath = path.resolve(
        __dirname,
        '../../public/uploads',
        bookFileName,
      );
      const uploadPdf = await cloudinary.uploader.upload(bookFilepath, {
        resource_type: 'raw',
        filename_override: bookFileName,
        folder: 'books',
        format: bookFile,
      });
      pdfUrl = uploadPdf?.secure_url;
      await fs.promises.unlink(bookFilepath);
    }
    const updatebook = await bookModal.findByIdAndUpdate(
      {
        _id: bookId,
      },
      {
        title: title,
        genre: genre,
        coverImg: coverImgUrl === '' ? book.coverImg : coverImgUrl,
        file: pdfUrl === '' ? book.file : pdfUrl,
      },
      { new: true },
    );
    return res.json({
      message: 'book updated',
      updatebook,
    });
  } catch (err) {
    return next(createHttpError(500, 'Error while update book'));
  }
};

const listBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await bookModal.find();
    res.json(books);
  } catch (err) {
    return next(createHttpError(500, 'error while getting a book'));
  }
};
const getSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bookId = req.params.bookId;
  try {
    const book = await bookModal.findOne({ _id: bookId });
    if (!book) {
      return next(createHttpError(404, 'book not found'));
    }
    return res.json(book);
  } catch (err) {
    return next(createHttpError(500, 'error while gating a book'));
  }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;
  try {
    const book = await bookModal.findOne({ _id: bookId });
    if (!book) {
      return next(createHttpError(404, 'book not found'));
    }
    const _req = req as AuthRequest;
    if (book.author.toString() !== _req.userId) {
      return next(createHttpError(403, 'You do not have access this source'));
    }
    // coverImg fileName on cloudinary
    const coverImgSplit = book.coverImg.split('/');
    const deleteId =
      coverImgSplit?.at(-2) + '/' + coverImgSplit?.at(-1)?.split('.')?.at(0);
    // delete book from cloudinary
    const pdfSplit = book.file.split('/');
    const pdfId = pdfSplit?.at(-2) + '/' + pdfSplit?.at(-1);
    try {
      await cloudinary.uploader.destroy(deleteId);
      await cloudinary.uploader.destroy(pdfId, {
        resource_type: 'raw',
      });
    } catch (err) {
      return next(createHttpError(500, 'error while deleting a book'));
    }
    await bookModal.findByIdAndDelete({ _id: bookId });
    return res.json({ message: 'book deleted' });
  } catch (err) {
    return next(createHttpError(500, 'error while deleting a book'));
  }
};
export { createBook, updateBook, listBooks, getSingleBook, deleteBook };
