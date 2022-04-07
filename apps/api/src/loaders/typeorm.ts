import { ConnectionOptions, createConnection } from 'typeorm';
import config from '../config';
import models from '../models';

export default async () => {
    const typeormConfig: ConnectionOptions = {
        type: 'postgres',
        host: config.database.host,
        port: Number(config.database.port),
        database: config.database.db,
        username: config.database.user,
        password: config.database.password,
        synchronize: true,
        entities: models
    };

    const connection = await createConnection(typeormConfig);

    return connection;
};
