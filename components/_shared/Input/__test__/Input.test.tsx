import { render, cleanup } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { UIInput } from '../Input';

afterEach(cleanup);

describe('<Input />', () => {
    const value: string = 'Test value';
    const placeholder: string = 'Test placeholder';
    const className: string = 'Test className';

    const onChange = vi.fn();

    it('should be in the Document', () => {
        const { getByRole } = render(<UIInput />);

        const elem = getByRole('textbox');
        expect(elem).toBeInTheDocument();
    });

    it('should process value, disabled and placeholder props', () => {
        const { getByDisplayValue } = render(
            <UIInput
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled
            />,
        );

        const elem = getByDisplayValue(value);
        expect(elem).toBeInTheDocument();
        expect(elem).toBeDisabled();
        expect(elem).toHaveAttribute('placeholder', placeholder);
    });

    it('should process className props', () => {
        const { getByTestId } = render(<UIInput className={className} />);

        const elem = getByTestId('input-test');
        expect(elem).toBeInTheDocument();
        expect(elem).toHaveClass(className);
    });

    it('should process className props', () => {
        const { getByTestId } = render(<UIInput className={className} />);

        const elem = getByTestId('input-test');
        expect(elem).toHaveClass(className);
    });
});
