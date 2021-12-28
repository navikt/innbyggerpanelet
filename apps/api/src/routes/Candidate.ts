import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Candidate } from '../entities';

export const candidateRouter = Router();

candidateRouter.get('/', async (req, res) => {
    const candidates = getRepository(Candidate).find();

    res.send(candidates);
});
