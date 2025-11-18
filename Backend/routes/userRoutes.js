import express from 'express';
import { getCurrentUser, loginUser, registerUser, updatePassword, updatePofile } from '../controller/userController.js';
import authMiddleware from '../middleware/auth.js';

const userRouter = express.Router();


//PUBLIC ROUTES

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);


//PRIVATE ROUTES protect also

userRouter.get('/me',authMiddleware,getCurrentUser);
userRouter.put('/profile',authMiddleware,updatePofile);
userRouter.put('/password',authMiddleware,updatePassword);

export default userRouter;