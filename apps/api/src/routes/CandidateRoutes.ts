import { plainToInstance } from 'class-transformer';
import { Router } from 'express';
import { database } from '../loaders';
import { Candidate } from '../models/candidate/CandidateEntity';
import { CandidateService, ICandidateSearch } from '../services';

const candidateRouter = Router();

candidateRouter.get('/', async (req, res, next) => {
    try {
        const queries = req.query as unknown as ICandidateSearch;

        const candidateService = new CandidateService(database);

        const result: Candidate[] | undefined = await candidateService.search(queries);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

candidateRouter.post('/', async (req, res, next) => {
    try {
        const candidateService = new CandidateService(database);
        const newCandidate = plainToInstance(Candidate, req.body);

        const result = await candidateService.create(newCandidate);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

export default candidateRouter;
