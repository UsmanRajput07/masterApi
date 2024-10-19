import mongoose from 'mongoose';
import { user } from './userTypes';

const userSchema = new mongoose.Schema<user>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

export default mongoose.model<user>("user", userSchema)