import { Router } from 'express';
import { criteriaQuery } from '../queries';

const criteriaRouter = Router();

criteriaRouter.get('/', async (req, res) => {
    const traits = await criteriaQuery.selectAllCriteria();

    res.send(traits);
});

criteriaRouter.post('/', async (req, res) => {
    const { traits } = req.body;
    const result = await criteriaQuery.insertCriteria(traits);

    res.send(result);
});

export default criteriaRouter;