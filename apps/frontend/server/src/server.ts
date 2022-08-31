import express, { Request, Response } from 'express';
import path from 'path';
import config from './config';

const buildPath = path.resolve(__dirname, '../../../dist/apss/frontend');

const app = express();

app.use('/', express.static(buildPath, { index: false }));
app.get('isalive|isready', (req: Request, res: Response) => {
    res.sendStatus(200);
});

app.listen(config.app.port, () => {
    console.log(`App listening on port: ${config.app.port}`);
});
