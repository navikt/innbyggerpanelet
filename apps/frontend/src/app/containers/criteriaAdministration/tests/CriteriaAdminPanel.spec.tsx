import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { SWRConfig } from 'swr';
import { CriteriaAdminPanel } from '..';

// Consider moving mocks to seperate file
const server = setupServer(
    rest.get('/api/criteriaCategory', (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    id: 1,
                    name: 'Alder',
                    description: 'Kandidatens aldergruppe.',
                    criteria: [
                        {
                            id: 1,
                            name: 'Mellom 18 og 25 år',
                            exclusivitySlug: 'age',
                        },
                        {
                            id: 2,
                            name: 'Mellom 26 og 35 år',
                            exclusivitySlug: 'age',
                        },
                    ],
                },
                {
                    id: 2,
                    name: 'Hjelpemidler',
                    description:
                        'Utvalg av mulige hjelpemidler tatt i bruk av kandidat.',
                    criteria: [
                        { id: 3, name: 'Skjermoppleser' },
                        { id: 4, name: 'Rullestol' },
                    ],
                },
            ])
        );
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads and displays all avaiable categories', async () => {
    render(<CriteriaAdminPanel />);

    await waitFor(() => screen.getAllByRole('button'));

    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getAllByRole('button')[1]);

    expect(screen.getByText('Alder'));
    expect(screen.getByText('Hjelpemidler'));

    expect(screen.getAllByRole('table')).toHaveLength(1);
});

test('displays error on status 404', async () => {
    const statusText = 'Not Found';
    server.use(
        rest.get('/api/criteriaCategory', (req, res, ctx) => {
            return res(ctx.status(404, statusText));
        })
    );

    // Make sure to disable SWRConfig when creating new tests with differing queries
    render(
        <SWRConfig value={{ provider: () => new Map() }}>
            <CriteriaAdminPanel />
        </SWRConfig>
    );

    await waitFor(() => screen.getByText(`404: ${statusText}`));

    expect(screen.getByText(`404: ${statusText}`));
});
