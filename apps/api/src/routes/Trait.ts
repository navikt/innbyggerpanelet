import { Router } from 'express';
import { traitQuery } from '../queries';

const traitRouter = Router();

traitRouter.get('/', async (req, res) => {
    const traits = await traitQuery.selectAllTraits();

    res.send(traits);
});

traitRouter.post('/', async (req, res) => {
    const { traits } = req.body;
    const result = await traitQuery.insertTraits(traits);

    res.send(result);
});

export default traitRouter;