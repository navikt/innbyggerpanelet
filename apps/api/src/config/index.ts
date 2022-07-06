import dotenv from 'dotenv';

dotenv.config();

let host;
let port;
let db;
let user;
let password;

const azureAd = {
    clientId: process.env.AZURE_APP_CLIENT_ID,
    secret: process.env.AZURE_APP_CLIENT_SECRET,
    tenantId: process.env.AZURE_APP_TENANT_ID
};

const idPorten = {
    clientId: process.env.IDPORTEN_CLIENT_ID,
    jwk: JSON.parse(process.env.IDPORTEN_CLIENT_JWK),
    redirectUri: process.env.IDPORTEN_REDIRECT_URI,
    wellKnown: process.env.IDPORTEN_WELL_KNOWN_URL
};

const frontend = {
    url: process.env.CLIENT_URL
};

const backend = {
    url: process.env.API_URL,
    prod: process.env.IS_PROD === 'yes'
};

const redis = {
    host: process.env.REDIS_HOST,
    port: 6379
};

const nais = {
    appName: process.env.NAIS_APP_NAME,
    cluster: process.env.NAIS_CLUSTER_NAME,
    namespace: process.env.NAIS_NAMESPACE
};

const kafka = {
    broker: process.env.KAFKA_BROKERS,
    topic: process.env.BESKJED_TOPIC
};

if (process.env.IS_PROD === 'yes') {
    host = process.env.NAIS_DATABASE_INNBYGGERPANELET_BACKEND_INNBYGGERPANELET_BACKEND_DB_HOST;
    port = process.env.NAIS_DATABASE_INNBYGGERPANELET_BACKEND_INNBYGGERPANELET_BACKEND_DB_PORT;
    db = process.env.NAIS_DATABASE_INNBYGGERPANELET_BACKEND_INNBYGGERPANELET_BACKEND_DB_DATABASE;
    user = process.env.NAIS_DATABASE_INNBYGGERPANELET_BACKEND_INNBYGGERPANELET_BACKEND_DB_USERNAME;
    password = process.env.NAIS_DATABASE_INNBYGGERPANELET_BACKEND_INNBYGGERPANELET_BACKEND_DB_PASSWORD;
} else if (process.env.IS_TEST === 'yes') {
    host = process.env.INNBYGGERPANELET_TEST_DB_HOST;
    port = process.env.INNBYGGERPANELET_TEST_DB_PORT;
    db = process.env.INNBYGGERPANELET_TEST_POSTGRES_DB;
    user = process.env.INNBYGGERPANELET_TEST_POSTGRES_USER;
    password = process.env.INNBYGGERPANELET_TEST_POSTGRES_PASSWORD;
} else {
    host = process.env.INNBYGGERPANELET_DB_HOST;
    port = process.env.INNBYGGERPANELET_DB_PORT;
    db = process.env.INNBYGGERPANELET_POSTGRES_DB;
    user = process.env.INNBYGGERPANELET_POSTGRES_USER;
    password = process.env.INNBYGGERPANELET_POSTGRES_PASSWORD;
}

export default {
    database: {
        host,
        port,
        db,
        user,
        password
    },
    azureAd,
    idPorten,
    frontend,
    backend,
    redis,
    nais,
    kafka
};
