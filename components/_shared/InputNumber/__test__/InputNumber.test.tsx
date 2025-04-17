import { render, cleanup } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { UIInputNumber } from '../InputNumber';

afterEach(cleanup);

describe('<InputNumber />', () => {
    it('should be in the Document', () => {
        const { getByTestId } = render(<UIInputNumber />);

        const elem = getByTestId('inputNumber-test');
        expect(elem).toBeInTheDocument();
    });
});
