import express, { Request, Response } from 'express';
import path from 'path';
import config from './config';

const app = express();

app.use(express.static(path.join(__dirname, '../../../dist/apps/frontend')));

app.get('isalive|isready', (req: Request, res: Response) => {
    res.sendStatus(200);
});
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../../dist/apps/frontend', 'index.html'));
});

app.listen(config.app.port, () => {
    console.log(`App listening at http://localhost:${config.app.port}`);
});
