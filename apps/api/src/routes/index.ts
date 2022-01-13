import { Router } from 'express';
import candidateRoutes from '../routes/Candidate';
import consentRouter from './Consent';
import insightRouter from './Insight';
import traitRouter from './Trait';

const routes = Router()
    .use('/candidate', candidateRoutes)
    .use('/consent', consentRouter)
    .use('/insight', insightRouter)
    .use('/trait', traitRouter);

export default Router().use('/api', routes);
