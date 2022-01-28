import { ConnectionOptions, createConnection } from 'typeorm';
import models from '../models';

export default async () => {
    const typeormConfig: ConnectionOptions = {
        type: 'postgres',
        host: process.env.NAIS_DATABASE_INNBYGGERPANELET_WEBAPI_INNBYGGERPANELET_DB_HOST,
        port: Number(process.env.NAIS_DATABASE_INNBYGGERPANELET_WEBAPI_INNBYGGERPANELET_DB_PORT),
        username: process.env.NAIS_DATABASE_INNBYGGERPANELET_WEBAPI_INNBYGGERPANELET_DB_USER,
        password: process.env.NAIS_DATABASE_INNBYGGERPANELET_WEBAPI_INNBYGGERPANELET_DB_PASSWORD,
        database: process.env.NAIS_DATABASE_INNBYGGERPANELET_WEBAPI_INNBYGGERPANELET_DB_DATABASE,
        synchronize: true,
        entities: models,
    };

    const connection = await createConnection(typeormConfig);

    return connection;
};
