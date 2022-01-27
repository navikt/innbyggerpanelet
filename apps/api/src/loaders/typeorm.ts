import { ConnectionOptions, createConnection } from 'typeorm';

export default async () => {
    const typeormConfig: ConnectionOptions = {
        type: 'postgres',
        host: process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_DB_HOST,
        port: Number(process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_DB_PORT),
        username: process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_DB_USER,
        password: process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_DB_PASSWORD,
        database: process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_DB_DATABASE,
        synchronize: true,
        entities: ['src/models/**/*.{ts,js}'],
    };

    const connection = await createConnection(typeormConfig);

    return connection;
};
