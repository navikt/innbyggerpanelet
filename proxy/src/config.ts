import dotenv from 'dotenv'

dotenv.config()

const app = {
    apiUrl: process.env.API_URL || 'http://localhost:1234',
    port: Number(process.env.PORT) || 8080,
    targetAudience: process.env.AUDIENCE,
}

const tokenX = {
    discoveryUrl: process.env.TOKEN_X_WELL_KNOWN_URL,
    clientID: process.env.TOKEN_X_CLIENT_ID,
    privateJwk: process.env.TOKEN_X_PRIVATE_JWK,
}

export default {
    app,
    tokenX,
}
