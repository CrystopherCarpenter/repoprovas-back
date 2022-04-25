import { Request, Response } from 'express';
import repoService from '../services/repoService.js';

export async function getData(req: Request, res: Response) {
    const data = await repoService.getData();

    res.send(data).status(200);
}
