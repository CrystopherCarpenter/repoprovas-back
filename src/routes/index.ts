import { Router } from 'express';
import repoRouter from './repoRouter.js';
import userRouter from './userRouter.js';

const router = Router();

router.use(userRouter);
router.use(repoRouter);

export default router;
