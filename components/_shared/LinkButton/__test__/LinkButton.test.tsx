import { render, cleanup } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { LinkButton } from '../LinkButton';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

describe('<LinkButton />', () => {
    const text = 'Test link';
    const url = '/test/url';

    it('should be in the Document', async () => {
        const { getByText } = render(
            <MemoryRouter>
                <LinkButton to={url}>{text}</LinkButton>
            </MemoryRouter>,
        );

        const elem = getByText(text);
        expect(elem.getAttribute('href')).toEqual(url);
    });
});
