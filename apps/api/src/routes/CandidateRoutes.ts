import { plainToInstance } from 'class-transformer';
import { Router } from 'express';
import { database } from '../loaders';
import { Candidate } from '../models/candidate/CandidateEntity';
import { CandidateService, ICandidateSearch } from '../services';
import { MessageService } from '../services/MessageService';
import { authenticated, navAuthenticated } from './middleware/authenticationHandler';

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

candidateRouter.get('/byInsightId/:id', navAuthenticated, async (req, res, next) => {
    try {
        const { id } = req.params;
        const candidateService = new CandidateService(database);
        const result: Candidate[] = await candidateService.getCandidatesByInsightId(id);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

candidateRouter.get('/currentUser', authenticated, async (req, res, next) => {
    try {
        const { id } = req.user;
        const candidateService = new CandidateService(database);

        const result: Candidate[] | undefined = await candidateService.getByUserId(id);

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

candidateRouter.put('/accept', authenticated, async (req, res, next) => {
    try {
        const { id } = req.user;

        const candidateService = new CandidateService(database);
        const updatedCandidate = plainToInstance(Candidate, req.body);
        const result = await candidateService.accept(updatedCandidate.insight.id, id);

        const messageService = new MessageService(database);
        await messageService.createAcceptCandidatureMessage(updatedCandidate.insight.id);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

candidateRouter.put('/decline', authenticated, async (req, res, next) => {
    try {
        const { id } = req.user;

        const candidateService = new CandidateService(database);
        const updatedCandidate = plainToInstance(Candidate, req.body);
        const result = await candidateService.decline(updatedCandidate.insight.id, id);

        const messageService = new MessageService(database);
        await messageService.createDeclineCandidatureMessage(updatedCandidate.insight.id);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

export default candidateRouter;
