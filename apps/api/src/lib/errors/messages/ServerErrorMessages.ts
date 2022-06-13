import { ValidationError } from 'class-validator';

export const ServerErrorMessage = {
    unexpected: () => 'Unexpected server error',
    invalidData: (errors: ValidationError[]) => JSON.stringify(errors),
    invalidQuery: () => 'Invalid query',
    forbidden: () => 'Forbidden route',
    notFound: (entity: string) => `${entity} not found`
};
