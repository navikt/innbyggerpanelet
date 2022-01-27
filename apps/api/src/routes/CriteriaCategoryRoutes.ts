import { Router } from 'express';
import { database } from '../loaders';
import { CriteriaCategory } from '../models/criteriaCategory/CriteriaCategoryEntity';
import { CriteriaCategoryService } from '../services';

const criteriaCategoryRoutes = Router();

criteriaCategoryRoutes.get('/', async (req, res) => {
    try {
        const criteriaCategoryService = new CriteriaCategoryService(database);
        const elections: CriteriaCategory[] | undefined =
            await criteriaCategoryService.get();
        res.json(elections);
    } catch (error) {
        console.error(error);
    }
});

/*
criteriaCategoryRoutes.post('/', async (req, res) => {
    const { categories } = req.body;
    const result = await CriteriaCategoryService.insertCriteriaCategory(
        categories
    );

    res.send(result);
});
*/

export default criteriaCategoryRoutes;
