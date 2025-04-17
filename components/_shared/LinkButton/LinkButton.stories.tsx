import type { Meta, StoryObj } from '@storybook/react';
import { LinkButton } from './LinkButton';
import { MemoryRouter } from "react-router";

const meta = {
    title: 'Example/LinkButton',
    component: LinkButton,
    parameters: {
        layout: 'centered',

    },
    decorators: [(Story) => (
        <MemoryRouter initialEntries={['/']}>
            {Story()}
        </MemoryRouter>
    )],
    argTypes: {
        to: { control: 'text' },
        children: { control: 'text' },
        className: { control: 'text' },
        target: { control: 'text' },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof LinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        to: '/',
        children: 'Перейти к примеру',
        className: 'custom-class',
        target: '_blank',
    },
};
