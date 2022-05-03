import { Request, Response } from 'express';
import { number, string } from 'joi';
import testService from '../services/testService.js';

async function find(req: Request, res: Response) {
    const { groupBy } = req.query as { groupBy: string };

    if (groupBy !== 'disciplines' && groupBy !== 'teachers') {
        return res.sendStatus(400);
    }

    const tests = await testService.find({ groupBy });
    res.send({ tests });
}

async function insert(req: Request, res: Response) {
    const testData = req.body;

    await testService.insert(testData);

    return res.sendStatus(201);
}

async function updateViews(req: Request, res: Response) {
    const testId: number = Number(req.params.id);

    await testService.updateViews(testId);

    return res.sendStatus(200);
}

export default {
    find,
    insert,
    updateViews,
};
