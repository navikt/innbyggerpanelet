import { ConnectionOptions, createConnection } from 'typeorm';
import config from '../config';
import models from '../models';
import dotenv from 'dotenv'

export default async () => {
    dotenv.config()

    const typeormConfig: ConnectionOptions = {
        type: 'postgres',
        host: process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_DATABASE_HOST,
        port: Number(process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_DATABASE_PORT!),
        database: process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_DATABASE_DATABASE,
        username: process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_DATABASE_USERNAME,
        password: process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_DATABASE_PASSWORD,
        synchronize: true,
        entities: models,
    };

    const connection = await createConnection(typeormConfig);

    return connection;
};
