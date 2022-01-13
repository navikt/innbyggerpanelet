import { ConnectionOptions, createConnection } from 'typeorm';

export default async () => {
    const typeormConfig: ConnectionOptions = {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        synchronize: true,
        entities: ['src/models/**/*.{ts,js}'],
    };

    const connection = await createConnection(typeormConfig);

    return connection;
};