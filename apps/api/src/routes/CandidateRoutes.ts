import { Router } from 'express';
import { candidateService } from '../services';

const candidateRouter = Router();

// Search all candidates ordered by number of matching criterias
// Example. /api/candidate?criteria=1&criteria=2
candidateRouter.get('/', async (req, res) => {
    const criteria = [req.query.criteria].flat() as string[];

    const candidates = await candidateService.selectSortedCandidatesBycriterias(
        criteria
    );

    res.send(candidates);
});

candidateRouter.get('/:id', async (req, res) => {
    const candidateID = parseInt(req.params.id);
    const candidate = await candidateService.selectCandidateById(candidateID);

    res.send(candidate);
});

candidateRouter.post('/', async (req, res) => {
    const { candidates } = req.body;
    const result = await candidateService.insertCandidates(candidates);

    res.send(result);
});

// For testing purposes, should take all candidate fields into account.
candidateRouter.patch('/:id', async (req, res) => {
    const candidateID = parseInt(req.params.id);
    const { criteriaID } = req.body;

    const result = await candidateService.addCriteria(candidateID, criteriaID);

    res.send(result);
});

export default candidateRouter;
