import { Router } from 'express';
import { database } from '../loaders';
import { Insight } from '../models/insight/InsightEntity';
import { IInsightSearch, InsightService } from '../services';

const insightRouter = Router();

insightRouter.get('/', async (req, res, next) => {
    try {
        const queries = req.query as unknown as IInsightSearch;

        const insightService = new InsightService(database);

        const result: Insight[] | undefined = await insightService.search(
            queries
        );

        res.json(result);
    } catch (error) {
        next(error);
    }
});

insightRouter.post('/', async (req, res, next) => {
    try {
        const insightService = new InsightService(database);
        const newInsight = req.body as Insight;

        const result = await insightService.create(newInsight);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

export default insightRouter;
