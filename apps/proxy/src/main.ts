import parser from 'body-parser';
import rTracer from 'cls-rtracer';
import express, { Request, Response } from 'express';
import path from 'path';
import session from './auth/session';
import config from './config';
import logger from './monitoring/logger';
import proxy from './proxy';

const app = express();

app.use(
    rTracer.expressMiddleware({
        useHeader: true,
        headerName: 'x_correlation_id'
    })
);

app.set('trust proxy', 1);
app.use(express.static(path.join(__dirname, '../../../dist/apps/frontend')));
app.use(parser.json());

app.get('isalive|isready', (req: Request, res: Response) => {
    res.sendStatus(200);
});
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../../dist/apps/frontend', 'index.html'));
});

logger.info('Setting up session and proxy');

app.get('/session', session());
app.use('/api', proxy(`http://localhost:${config.app.port}`));

app.listen(config.app.port, () => {
    logger.info(`App listening at http://localhost:${config.app.port}`);
});
