import { ICriteria } from '@innbyggerpanelet/api-interfaces';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { SWRConfig } from 'swr';
import { CriteriaCreateModal } from '..';
import { mocks } from '../../../utils/mocks';

// Consider moving mocks to seperate file
const server = setupServer(
    rest.post('/api/criteria', (req, res, ctx) => {
        return res(ctx.json(mockedPost));
    })
);

const mockedPost: ICriteria = {
    id: 0,
    name: 'Hygienehjelpemidler',
    exclusivitySlug: undefined,
    category: mocks.allCriteriaCategories[0]
};

const setup = () => {
    const handleClose = jest.fn();

    const utils = render(
        <SWRConfig value={{ provider: () => new Map() }}>
            <CriteriaCreateModal open={true} close={handleClose} category={mockedPost.category} />
        </SWRConfig>
    );
    const nameInput = utils.getByLabelText('Navn') as HTMLInputElement;
    const exInput = utils.getByLabelText('Eklusivitet slug') as HTMLInputElement;
    const submit = utils.getAllByRole('button')[0] as HTMLButtonElement;

    return {
        nameInput,
        exInput,
        submit,
        handleClose,
        ...utils
    };
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('post new criteria successfully', async () => {
    const { nameInput, exInput, submit, handleClose } = setup();

    fireEvent.change(nameInput, { target: { value: mockedPost.name } });
    fireEvent.change(exInput, {
        target: { value: mockedPost.exclusivitySlug }
    });

    expect(nameInput.value).toBe(mockedPost.name);

    fireEvent.click(submit);

    await waitFor(() => expect(handleClose).toHaveBeenCalledTimes(1));
});

test('post new criteria unsuccessfully', async () => {
    server.use(
        rest.post('/api/criteria', (req, res, ctx) => {
            return res(ctx.status(502, 'ERROR'));
        })
    );

    const { nameInput, exInput, submit, handleClose } = setup();

    fireEvent.change(nameInput, { target: { value: mockedPost.name } });
    fireEvent.change(exInput, {
        target: { value: mockedPost.exclusivitySlug }
    });

    expect(nameInput.value).toBe(mockedPost.name);

    fireEvent.click(submit);

    await waitFor(() => expect(handleClose).toHaveBeenCalledTimes(0));
});
