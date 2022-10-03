import { ConnectionOptions, createConnection } from 'typeorm'
import config from '../config'
import models from '../models'

// Config for setting up connection to database
export default async () => {
    const typeormConfig: ConnectionOptions = {
        type: 'postgres',
        host: config.database.host,
        port: Number(config.database.port),
        database: config.database.db,
        username: config.database.user,
        password: config.database.password,
        synchronize: true,
        entities: models,
    }

    return await createConnection(typeormConfig)
}
