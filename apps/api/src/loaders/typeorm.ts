import { ConnectionOptions, createConnection } from 'typeorm';
import config from '../config';
import models from '../models';

export default async () => {
    const typeormConfig: ConnectionOptions = {
        type: 'postgres',
        host: process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_API_DB_HOST,
        port: Number(process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_API_DB_PORT),
        database: process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_API_DB_DATABASE,
        username: process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_API_DB_USERNAME,
        password: process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_API_DB_PASSWORD,
        synchronize: true,
        entities: models,
    };

    const connection = await createConnection(typeormConfig);

    return connection;
};
