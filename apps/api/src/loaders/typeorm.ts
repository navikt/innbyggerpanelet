import { ConnectionOptions, createConnection } from 'typeorm';
import config from '../config';
import models from '../models';

export default async () => {
    const typeormConfig: ConnectionOptions = {
        type: 'postgres',
        host: config.database.host,
        port: Number.parseInt(config.database.port!),
        username: config.database.user,
        password: config.database.password,
        database: config.database.db,
        synchronize: true,
        entities: models,
    };

    const connection = await createConnection(typeormConfig);

    return connection;
};
