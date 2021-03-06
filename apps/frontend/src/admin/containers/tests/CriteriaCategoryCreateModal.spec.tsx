import { ICriteriaCategory } from '@innbyggerpanelet/api-interfaces';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { SWRConfig } from 'swr';
import { CriteriaCategoryCreateModal } from '..';

// Consider moving mocks to seperate file
const server = setupServer(
    rest.post('/api/criteriaCategory', (req, res, ctx) => {
        return res(ctx.json(mockedPost));
    })
);

const mockedPost: ICriteriaCategory = {
    id: 0,
    name: 'Hygienehjelpemidler',
    description: 'Samling av hygienehjelpemidler.'
};

const setup = () => {
    const handleClose = jest.fn();

    const utils = render(
        <SWRConfig value={{ provider: () => new Map() }}>
            <CriteriaCategoryCreateModal open={true} close={handleClose} />
        </SWRConfig>
    );
    const nameInput = utils.getByLabelText('Navn') as HTMLInputElement;
    const descriptionInput = utils.getByLabelText('Beskrivelse') as HTMLInputElement;
    const submit = utils.getAllByRole('button')[0] as HTMLButtonElement;

    return {
        nameInput,
        descriptionInput,
        submit,
        handleClose,
        ...utils
    };
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('post new criteria category successfully', async () => {
    const { nameInput, descriptionInput, submit, handleClose } = setup();

    fireEvent.change(nameInput, { target: { value: mockedPost.name } });
    fireEvent.change(descriptionInput, {
        target: { value: mockedPost.description }
    });

    expect(nameInput.value).toBe(mockedPost.name);

    fireEvent.click(submit);

    await waitFor(() => expect(handleClose).toHaveBeenCalledTimes(1));
});

test('post new criteria category unsuccessfully', async () => {
    server.use(
        rest.post('/api/criteriaCategory', (req, res, ctx) => {
            return res(ctx.status(502, 'ERROR'));
        })
    );

    const { nameInput, descriptionInput, submit, handleClose } = setup();

    fireEvent.change(nameInput, { target: { value: mockedPost.name } });
    fireEvent.change(descriptionInput, {
        target: { value: mockedPost.description }
    });

    expect(nameInput.value).toBe(mockedPost.name);

    fireEvent.click(submit);

    await waitFor(() => expect(handleClose).toHaveBeenCalledTimes(0));
});
