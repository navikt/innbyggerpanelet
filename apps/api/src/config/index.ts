import dotenv from 'dotenv';

dotenv.config();

let host;
let port;
let db;
let user;
let password;
let url;
if (process.env.IS_PROD === 'yes') {
    host = process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_DB_HOST;
    port = process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_DB_PORT;
    db = process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_DB_DATABASE;
    user = process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_DB_USERNAME;
    password = process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_DB_PASSWORD;
    url = process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_DB_URL;
} else {
    host = process.env.DB_HOST;
    port = process.env.DB_PORT;
    db = process.env.POSTGRES_DB;
    user = process.env.POSTGRES_USER;
    password = process.env.POSTGRES_PASSWORD;
}

export default {
    database: {
        host: host,
        port: port,
        db: db,
        user: user,
        password: password,
        url
    },
};