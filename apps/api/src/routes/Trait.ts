import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Trait } from '../entities';

export const traitRouter = Router();

traitRouter.get('/', async (req, res) => {
    const traits = getRepository(Trait).find();

    res.send(traits);
});
