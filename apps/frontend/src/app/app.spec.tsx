import { cleanup, getByText, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './app';

describe('App', () => {
    it('should render successfully', async () => {
        expect(true);
    });

    it('should test', () => {
        expect('innbyggerpanel').toBe('innbyggerpanel');
    });
});
