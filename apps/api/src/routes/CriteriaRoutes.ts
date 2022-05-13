import { Router } from 'express';
import { database } from '../loaders';
import { Criteria } from '../models/criteria/CriteriaEntity';
import { CriteriaService, ICriteriaSearch } from '../services';
import { authenticated } from './middleware/authenticationHandler';

const criteriaRouter = Router();

criteriaRouter.get('/', async (req, res, next) => {
    try {
        // Hacky, consider assigning string | string[] to queries through request and
        // split into object with where and sort fields.
        // TODO: Find better solution for casting queries.
        const queries = req.query as unknown as ICriteriaSearch;

        const criteriaService = new CriteriaService(database);
        const result: Criteria[] = await criteriaService.search(queries);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

criteriaRouter.post('/', async (req, res, next) => {
    try {
        const criteriaService = new CriteriaService(database);
        const newCriteriaCategory = req.body as Criteria;

        const result = await criteriaService.create(newCriteriaCategory);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

criteriaRouter.put('/', authenticated, async (req, res, next) => {
    try {
        const criteriaService = new CriteriaService(database);
        const updatedCriteria = req.body as Criteria;

        const result = await criteriaService.update(updatedCriteria.id, updatedCriteria);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

export default criteriaRouter;
