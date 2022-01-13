import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Insight } from '../entities';

const insightRouter = Router();

insightRouter.get('/', async (req, res) => {
    const insights = getRepository(Insight).find();

    res.send(insights);
});

export default insightRouter;