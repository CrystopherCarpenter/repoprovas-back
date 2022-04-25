import { Request, Response } from 'express';
import userService, { CreateUserData } from '../services/userService.js';

export async function signUp(req: Request, res: Response) {
    const user: CreateUserData = req.body;

    await userService.insert(user);

    res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
    const user: CreateUserData = req.body;

    const token = await userService.signIn(user);

    res.send(token);
}

export async function authConfirmation(req: Request, res: Response) {
    return res.sendStatus(200);
}

export async function logout(req: Request, res: Response) {
    const authorization = req.headers['authorization'];
    const token = authorization.replace('Bearer ', '');

    await userService.insertBlockedToken({ token });

    return res.sendStatus(200);
}
