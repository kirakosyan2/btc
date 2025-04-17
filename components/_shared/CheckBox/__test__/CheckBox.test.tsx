import { render, cleanup } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { UICheckBox } from '../CheckBox';

afterEach(cleanup);

describe('<CheckBox />', () => {
    const testText = 'Test text';

    it('should be in the Document', () => {
        const { getByText } = render(<UICheckBox>{testText}</UICheckBox>);

        const elem = getByText(testText);
        expect(elem).toBeInTheDocument();
    });

    it('should pass disabled props', () => {
        const { getByRole } = render(<UICheckBox disabled>{testText}</UICheckBox>);

        const elem = getByRole('checkbox');
        expect(elem).toHaveProperty('disabled');
    });
});
