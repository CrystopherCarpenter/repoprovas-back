import { Router } from 'express';
import { getData } from '../controllers/repoController.js';
import { ensureAuthenticatedMiddleware } from '../middlewares/ensureAuthenticatedMiddleware.js';

const repoRouter = Router();

repoRouter.get('/repository-data', ensureAuthenticatedMiddleware, getData);

export default repoRouter;
