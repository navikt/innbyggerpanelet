import { render, waitFor, screen } from '@testing-library/react';
import { ProgressBar } from '.';

test('progress bar displays correct percentage 50%', async () => {
    render(<ProgressBar label="Relevansgradering" progress={0.5} />);

    await waitFor(() => screen.getByText('Relevansgradering'));

    expect(screen.getByText('50%'));
});

test('progress bar displays correct percentage 100%', async () => {
    render(<ProgressBar label="Relevansgradering" progress={1} />);

    await waitFor(() => screen.getByText('Relevansgradering'));

    expect(screen.getByText('100%'));
});

test('progress bar displays correct percentage 0%', async () => {
    render(<ProgressBar label="Relevansgradering" progress={0} />);

    await waitFor(() => screen.getByText('Relevansgradering'));

    expect(screen.getByText('0%'));
});
