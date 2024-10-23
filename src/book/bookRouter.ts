
import express from 'express';
import { createBook } from './bookControler';

const bookRouter = express.Router();

// routes
bookRouter.post("/create", createBook);


export default bookRouter;