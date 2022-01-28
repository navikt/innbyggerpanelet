import { Router } from 'express';
import { database } from '../loaders';
import { CriteriaCategory } from '../models/criteriaCategory/CriteriaCategoryEntity';
import { CriteriaCategoryService } from '../services';

const criteriaCategoryRoutes = Router();

criteriaCategoryRoutes.get('/', async (req, res) => {
    try {
        const criteriaCategoryService = new CriteriaCategoryService(database);
        const result: CriteriaCategory[] | undefined =
            await criteriaCategoryService.get();
        res.json(result);
    } catch (error) {
        console.error(error);
    }
});

criteriaCategoryRoutes.post('/', async (req, res) => {
    try {
        const criteriaCategoryService = new CriteriaCategoryService(database);
        const newCriteriaCategory = req.body as CriteriaCategory;

        const result = await criteriaCategoryService.create(
            newCriteriaCategory
        );

        res.json(result);
    } catch (error) {
        console.error(error);
    }
});

export default criteriaCategoryRoutes;
