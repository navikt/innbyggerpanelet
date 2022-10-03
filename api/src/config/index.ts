import dotenv from 'dotenv'

dotenv.config()

let host
let port
let db
let user
let password

const frontend = {
    url: process.env.CLIENT_URL,
}

const backend = {
    url: process.env.API_URL,
    prod: process.env.IS_PROD === 'yes',
}

const nais = {
    appName: process.env.NAIS_APP_NAME,
    cluster: process.env.NAIS_CLUSTER_NAME,
    namespace: process.env.NAIS_NAMESPACE,
}

const kafka = {
    broker: process.env.KAFKA_BROKERS,
    topic: process.env.BESKJED_TOPIC,
}

if (process.env.IS_PROD === 'yes') {
    host = process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_BACKEND_DB_HOST
    port = process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_BACKEND_DB_PORT
    db = process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_BACKEND_DB_DATABASE
    user = process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_BACKEND_DB_USERNAME
    password = process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_BACKEND_DB_PASSWORD
} else {
    host = process.env.INNBYGGERPANELET_DB_HOST
    port = process.env.INNBYGGERPANELET_DB_PORT
    db = process.env.INNBYGGERPANELET_POSTGRES_DB
    user = process.env.INNBYGGERPANELET_POSTGRES_USER
    password = process.env.INNBYGGERPANELET_POSTGRES_PASSWORD
}

export default {
    database: {
        host,
        port,
        db,
        user,
        password,
    },
    frontend,
    backend,
    nais,
    kafka,
}
