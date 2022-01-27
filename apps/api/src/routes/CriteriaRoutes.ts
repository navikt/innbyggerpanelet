import { Router } from 'express';
import { criteriaQuery } from '../services';

const criteriaRouter = Router();

criteriaRouter.get('/', async (req, res) => {
    const criterias = await criteriaQuery.selectAllCriteria();

    res.send(criterias);
});

criteriaRouter.post('/', async (req, res) => {
    const { criterias } = req.body;
    const result = await criteriaQuery.insertCriteria(criterias);

    res.send(result);
});

export default criteriaRouter;
