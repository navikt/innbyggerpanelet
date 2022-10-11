import dotenv from 'dotenv'

dotenv.config()

interface IAzureAD {
    clientId: string | undefined
    secret: string | undefined
    tenantId: string | undefined
}

const authType = process.env.AUTH_TYPE

let azureAd: IAzureAD = {
    clientId: undefined,
    secret: undefined,
    tenantId: undefined,
}

if (authType == 'azureAD') {
    azureAd = {
        clientId: process.env.AZURE_APP_CLIENT_ID,
        secret: process.env.AZURE_APP_CLIENT_SECRET,
        tenantId: process.env.AZURE_APP_TENANT_ID,
    }
}

const app = {
    apiUrl: process.env.API_URL || 'http://localhost:8081',
    port: Number(process.env.PORT) || 8080,
    targetAudience: process.env.AUDIENCE,
    url: process.env.URL,
}

const tokenX = {
    discoveryUrl: process.env.TOKEN_X_WELL_KNOWN_URL,
    clientID: process.env.TOKEN_X_CLIENT_ID,
    privateJwk: process.env.TOKEN_X_PRIVATE_JWK,
}

export default {
    app,
    tokenX,
    azureAd,
    authType,
}
