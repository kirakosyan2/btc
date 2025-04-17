import { render, cleanup } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { UIButton } from '../Button';
import { ButtonSize, ButtonVariantType } from 'antd/es/button';

afterEach(cleanup);

describe('<Button />', () => {
    const size: ButtonSize = 'large';
    const variant: ButtonVariantType = 'filled';
    const text: string = 'testTextButton';
    const onButtonClick = vi.fn();

    it('should be in the Document', async () => {
        const { getByText } = render(
            <UIButton
                size={size}
                variant={variant}
                onClick={onButtonClick}
            >
                {text}
            </UIButton>,
        );

        const elem = getByText(text);
        expect(elem).toBeInTheDocument();
    });

    it('should handle onClick', async () => {
        const { getByText } = render(
            <UIButton
                size={size}
                variant={variant}
                onClick={onButtonClick}
            >
                {text}
            </UIButton>,
        );

        const elem = getByText(text);
        userEvent.click(elem);
    });

    it('should process classNames props', () => {
        const { getByRole } = render(
            <UIButton
                size={size}
                variant={variant}
                onClick={onButtonClick}
                className="testClassName"
            >
                {text}
            </UIButton>,
        );

        const btn = getByRole('button');
        expect(btn).toHaveClass('testClassName');
    });
});
