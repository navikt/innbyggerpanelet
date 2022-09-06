// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
    production: false,
    azureAd: {
        clientId: process.env.AZURE_APP_CLIENT_ID,
        secret: process.env.AZURE_APP_CLIENT_SECRET,
        tenantId: process.env.AZURE_APP_TENANT_ID
    },
    idPorten: {
        clientId: process.env.IDPORTEN_CLIENT_ID,
        jwk: JSON.parse(process.env.IDPORTEN_CLIENT_JWK!),
        redirectUri: process.env.IDPORTEN_REDIRECT_URI,
        wellKnown: process.env.IDPORTEN_WELL_KNOWN_URL
    }
};
