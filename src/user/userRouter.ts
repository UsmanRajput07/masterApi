import express from 'express';
import { createUser } from './userController';

const UserRouter = express.Router();

UserRouter.post('/register', createUser);

export default UserRouter;