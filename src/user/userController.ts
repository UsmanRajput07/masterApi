import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import userModal from "./userModal";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        const error = createHttpError(400, 'All fields are required');
        return next(error);
    }

    //  database check
    const user = await userModal.findOne({email});
    if(user) {
        const error = createHttpError(400, 'User already exists');
        return next(error);
    }
    const hasshedPassword = await bcrypt.hash(password, 10);
    res.json({ message: 'hello world', name, email, password });
};

export {
    createUser
}