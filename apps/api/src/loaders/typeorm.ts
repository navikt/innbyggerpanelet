import { ConnectionOptions, createConnection } from 'typeorm';
import config from '../config';
import models from '../models';

export default async () => {
    const typeormConfig: ConnectionOptions = {
        type: 'postgres',
        url: config.database.url,
        synchronize: true,
        entities: models,
    };

    const connection = await createConnection(typeormConfig);

    return connection;
};
