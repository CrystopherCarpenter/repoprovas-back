import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import { ensureAuthenticatedMiddleware } from '../middlewares/ensureAuthenticatedMiddleware.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import { userSchema } from '../schemas/userSchema.js';

const userRouter = Router();
userRouter.post(
    '/signup',
    validateSchemaMiddleware(userSchema),
    userController.signUp
);
userRouter.post(
    '/',
    validateSchemaMiddleware(userSchema),
    userController.signIn
);
userRouter.get(
    '/auth-token',
    ensureAuthenticatedMiddleware,
    userController.authConfirmation
);
userRouter.get('/logout', ensureAuthenticatedMiddleware, userController.logout);

export default userRouter;
