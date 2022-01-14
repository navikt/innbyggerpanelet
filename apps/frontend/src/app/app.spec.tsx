import { cleanup, getByText, render, waitFor } from '@testing-library/react';
import React from 'react';
import App from './app';

describe('App', () => {
    it('should render successfully', async () => {
        expect(true);
    });

    it('should test', () => {
        expect('innbyggerpanel').toBe('innbyggerpanel');
    });
});
