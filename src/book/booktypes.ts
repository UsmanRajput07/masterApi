import { User } from "../user/userTypes";

export interface Book {
    _id: string,
    title: string,
    author: User,
    genre: string,
    file: string,
    cover: string,
    createdAt: Date,
    updatedAt: Date
}