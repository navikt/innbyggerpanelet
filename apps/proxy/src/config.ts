const app = {
    apiUrl: process.env.API_URL,
    port: Number(process.env.PORT) || 3000,
    targetAudience: process.env.AUDIENCE
};

const tokenX = {
    discoveryUrl: process.env.TOKEN_X_WELL_KNOWN_URL,
    clientID: process.env.TOKEN_X_CLIENT_ID,
    privateJwk: process.env.TOKEN_X_PRIVATE_JWK
};

export default {
    app,
    tokenX
};
