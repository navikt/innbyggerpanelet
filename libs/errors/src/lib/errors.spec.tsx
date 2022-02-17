import { render } from '@testing-library/react';

import Errors from './errors';

describe('Errors', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Errors />);
        expect(baseElement).toBeTruthy();
    });
});
