import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { SWRConfig } from 'swr';
import CriteriaAdminPanel from '..';
import { mocks } from '../../../utils/mocks';

// Consider moving mocks to seperate file
const server = setupServer(
    rest.get('/api/criteriaCategory', (req, res, ctx) => {
        return res(ctx.json(mocks.allCriteriaCategories));
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
});

test('displays error on status 404', async () => {
    const statusText = 'Ingen resultater funnet.';
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

    await waitFor(() => screen.getByText(statusText));

    expect(screen.getByText(statusText));
});
