import { ConnectionOptions, createConnection } from 'typeorm';
import config from '../config';
import models from '../models';
import dotenv from 'dotenv'

export default async () => {
    const typeormConfig: ConnectionOptions = {
        type: 'postgres',
        host: process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_DBS_HOST,
        port: Number(process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_DBS_PORT!),
        database: process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_DBS_DATABASE,
        username: process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_DBS_USERNAME,
        password: process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_DBS_PASSWORD,
        synchronize: true,
        entities: models,
    };

    const connection = await createConnection(typeormConfig);

    return connection;
};
