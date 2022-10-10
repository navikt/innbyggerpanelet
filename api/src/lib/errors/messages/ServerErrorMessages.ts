import { ValidationError } from 'class-validator'

export const ServerErrorMessage = {
    unexpected: () => 'Unexpected server error',
    invalidData: (errors: ValidationError[]) => JSON.stringify(errors),
    invalidQuery: () => 'Invalid query',
    forbidden: () => 'Forbidden route',
    notFound: (entity: string) => `${entity} not found`,
    noBearerSchema: () => 'No bearer schema provided',
    noTokenInSchema: () => 'No token in provided schema',
    expiredToken: () => 'Provided token has expired',
    wrongAudience: () => 'Wrong audience in token',
    wrongIssuer: () => 'Not correct issuer in token',
    unauthorized: () => 'You are not authorized',
}
