import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import userModal from "./userModal";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { user } from "./userTypes";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        const error = createHttpError(400, 'All fields are required');
        return next(error);
    }


    //  database check
    try {
        const user = await userModal.findOne({ email });
        if (user) {
            const error = createHttpError(400, 'User already exists');
            return next(error);
        }
    }
    catch (err) {
        return next(createHttpError(500, 'Error while checking user in database'));
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser: user
    try {
        newUser = await userModal.create({
            name,
            email,
            password: hashedPassword
        })
    }
    catch (err) {
        return next(createHttpError(500, 'Error while creating  user in database'));

    }


    //  jwt token generate
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, { expiresIn: '7d' });

    res.status(201).json({ message: 'User created successfully', accesToken: token });
};

// loginUser 

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(createHttpError(400, 'All fields are required'));
    }
    let user;
    try {
        user = await userModal.findOne({ email });
        if (!user) {
            return next(createHttpError(404, 'User not found'));
        }
    }
    catch (err) {
        return next(createHttpError(500, 'Error while checking user in database'));
    }
    try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(createHttpError(401, 'Invalid credentials'));
        }
    }
    catch (err) {
        return next(createHttpError(500, 'Error while comparing password in database'));
    }
    try {
        const token = sign({ sub: user._id }, config.jwtSecret as string, { expiresIn: '7d' });
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (err) {
        return next(createHttpError(500, 'Error while generating token'));
    }
}

export {
    createUser,
    loginUser
}