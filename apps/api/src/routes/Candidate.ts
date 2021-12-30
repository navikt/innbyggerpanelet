import { Router } from 'express';
import { candidateQuery } from '../queries';

export const candidateRouter = Router();

// Search all candidates ordered by number of matching traits
// Example. /api/candidate?trait=1&trait=2
candidateRouter.get('/', async (req, res) => {
    const trait = [req.query.trait].flat() as string[];

    const candidates = await candidateQuery.selectSortedCandidatesByTraits(
        trait
    );

    res.send(candidates);
});

candidateRouter.get('/:id', async (req, res) => {
    const candidateID = parseInt(req.params.id);
    const candidate = await candidateQuery.selectCandidateById(candidateID);

    res.send(candidate);
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
