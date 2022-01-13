import * as express from 'express';
import * as helmet from 'helmet';
import * as dotenv from 'dotenv';
import { internalRouter } from './app/internal';
import { createConnection } from 'typeorm';
import { Candidate, Consent, Insight, Trait } from './entities';
import {
    candidateRouter,
    consentRouter,
    insightRouter,
    traitRouter,
} from './routes';

dotenv.config();

const entities = [Trait, Insight, Consent, Candidate];

// Config should make use of env variables.
createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    entities: entities,
}).then((connection) => {
    const app = express();
    app.use(express.json());
    app.use(helmet());

    app.use('/internal', internalRouter);
    app.use('/api/candidate', candidateRouter);
    app.use('/api/consent', consentRouter);
    app.use('api/insight', insightRouter);
    app.use('/api/trait', traitRouter);

    const port = process.env.port || 3333;
    const server = app.listen(port, () => {
        console.log('Listening at http://localhost:' + port + '/api');
    });
    server.on('error', console.error);
});
