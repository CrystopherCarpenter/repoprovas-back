import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import userService from '../services/userService.js';
dotenv.config();

export async function ensureAuthenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authorization = req.headers['authorization'];
    if (!authorization) {
        throw { type: 'unauthorized' };
    }

    const token = authorization.replace('Bearer ', '');

    await userService.findToken(token);

    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as {
        userId: number;
    };

    const user = await userService.findById(userId);
    res.locals.user = user;

    next();
}
