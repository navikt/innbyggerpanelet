export const ServerErrorMessage = {
    unexpected: () => 'Unexpected server error',
    invalidData: () => 'Invalid data',
    notFound: (entity: string) => `${entity} not found`
};