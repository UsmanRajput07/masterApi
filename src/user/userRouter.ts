import express from 'express';
import { createUser, loginUser } from './userController';

const UserRouter = express.Router();

UserRouter.post('/register', createUser);
UserRouter.post('/login', loginUser);

export default UserRouter;