import { json, Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from '../routes';
export default({ server }: { server: Application}) => {
    server.use(helmet());
    server.use(cors());
    server.use(json());
    server.use(routes);
};