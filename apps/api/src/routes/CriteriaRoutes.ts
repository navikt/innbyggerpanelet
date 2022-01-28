import { Router } from 'express';
import { database } from '../loaders';
import { Criteria } from '../models/criteria/CriteriaEntity';
import { CriteriaService, ICriteriaSearch } from '../services';

const criteriaRouter = Router();

criteriaRouter.get('/', async (req, res) => {
    try {
        // Hacky, consider assigning string | string[] to queries through request and
        // split into object with where and sort fields.
        const queries = req.query as unknown as ICriteriaSearch;

        const criteriaService = new CriteriaService(database);
        const result: Criteria[] | undefined = await criteriaService.search(
            queries
        );
        res.json(result);
    } catch (error) {
        console.error(error);
    }
});

criteriaRouter.post('/', async (req, res) => {
    try {
        const criteriaService = new CriteriaService(database);
        const newCriteriaCategory = req.body as Criteria;

        const result = await criteriaService.create(newCriteriaCategory);

        res.json(result);
    } catch (error) {
        console.error(error);
    }
});

export default criteriaRouter;
