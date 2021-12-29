import { Router } from 'express';
import { candidateQuery } from '../queries';

export const candidateRouter = Router();

// Should make search functionality based on fields in entity.
// Example. /api/candidate?traits=[1,2,3,4]&consents=[1]
candidateRouter.get('/', async (req, res) => {
    const candidates = await candidateQuery.selectAllCandidates();

    res.send(candidates);
});

candidateRouter.post('/', async (req, res) => {
    const { candidates } = req.body;
    const result = await candidateQuery.insertCandidates(candidates);

    res.send(result);
});

// For testing purposes, should take all candidate fields into account.
candidateRouter.patch('/:id', async (req, res) => {
    const candidateID = parseInt(req.params.id);
    const { traitID } = req.body;

    const result = await candidateQuery.addTrait(candidateID, traitID);

    res.send(result);
});
