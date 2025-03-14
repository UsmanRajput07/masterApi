import path from 'node:path';
import multer from 'multer';
import express from 'express';
import {
  createBook,
  deleteBook,
  getSingleBook,
  listBooks,
  updateBook,
} from './bookControler';
import authenticate from '../middlewears/authenticate';

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
  dest: path.resolve(__dirname, '../../public/uploads'),
  limits: {
    fileSize: 3e7,
  },
});

// routes
bookRouter.post(
  '/create',
  authenticate,
  upload?.fields([
    {
      name: 'coverImg',
      maxCount: 1,
    },
    {
      name: 'file',
      maxCount: 1,
    },
  ]),
  createBook,
);
bookRouter.patch(
  '/update/:bookId',
  authenticate,
  upload.fields([
    {
      name: 'coverImg',
      maxCount: 1,
    },
    {
      name: 'file',
      maxCount: 1,
    },
  ]),
  updateBook,
);
bookRouter.get('/', listBooks);
bookRouter.get('/:bookId', getSingleBook);

bookRouter.delete('/:bookId', authenticate, deleteBook);

export default bookRouter;
