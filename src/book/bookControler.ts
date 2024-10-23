import { NextFunction, Request, Response } from "express";
const createBook = async (req: Request, res: Response, next: NextFunction) => {
    return res.json({ message: "Create book" });
}

export  {
    createBook
}