import { Router } from 'express';
import { database } from '../loaders';
import { Candidate } from '../models/candidate/CandidateEntity';
import { CandidateService, ICandidateSearch } from '../services';

const candidateRouter = Router();

candidateRouter.get('/', async (req, res) => {
    try {
        const queries = req.query as unknown as ICandidateSearch;

        const candidateService = new CandidateService(database);

        const result: Candidate[] | undefined = await candidateService.search(
            queries
        );

        res.json(result);
    } catch (error) {
        console.error(error);
    }
});

candidateRouter.post('/', async (req, res) => {
    try {
        const candidateService = new CandidateService(database);
        const newCandidate = req.body as Candidate;

        const result = await candidateService.create(newCandidate);

        res.json(result);
    } catch (error) {
        console.log(error);
    }
});

export default candidateRouter;
