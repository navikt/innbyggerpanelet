import { Router } from 'express';
import { database } from '../loaders';
import { Criteria } from '../models/criteria/CriteriaEntity';
import { CriteriaService } from '../services';

const criteriaRouter = Router();

criteriaRouter.get('/', async (req, res) => {
    try {
        const criteriaService = new CriteriaService(database);
        const result: Criteria[] | undefined = await criteriaService.get();
        res.json(result);
    } catch (error) {
        console.error(error);
    }
});

// A bit hacky, should be integrated into main get with proper filter/sorting capabilities
criteriaRouter.get('/byCategory/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const criteriaService = new CriteriaService(database);
        const result: Criteria[] | undefined =
            await criteriaService.getByCategoryId(id);
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
