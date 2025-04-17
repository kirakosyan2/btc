import { render, cleanup } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { UIInputPassword } from '../InputPassword';

afterEach(cleanup);

describe('<InputPassowrd />', () => {
    it('should be in the Document', () => {
        const { getByTestId } = render(<UIInputPassword />);

        const elem = getByTestId('input-test');
        expect(elem).toBeInTheDocument();
    });

    it('should be type password', () => {
        const { getByTestId } = render(<UIInputPassword />);

        const elem = getByTestId('input-test');
        expect(elem).toHaveAttribute('type', 'password');
    });
});
