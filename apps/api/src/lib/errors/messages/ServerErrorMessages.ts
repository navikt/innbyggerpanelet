export const ServerErrorMessage = {
    unexpected: () => 'Unexpected server error',
    invalidData: () => 'Invalid data',
    forbidden: () => 'Forbidden route',
    notFound: (entity: string) => `${entity} not found`
};
