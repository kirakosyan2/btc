import type { Meta, StoryObj } from '@storybook/react';
import { UISqlEditor } from './SqlEditor';

const meta = {
    title: 'Example/SqlEditor',
    component: UISqlEditor,
    parameters: {
        layout: 'centered',
    },
    args: {
        value: 'SELECT * FROM users',
        width: '500px',
        minHeight: '13rem',
        maxHeight: '60rem',
        code: '',
        userParams: [],
    },
    argTypes: {
        value: { control: 'text' },
        width: { control: 'text' },
        minHeight: { control: 'text' },
        maxHeight: { control: 'text' },
        code: { control: 'text' },
        userParams: { control: 'object' },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof UISqlEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        value: 'SELECT * FROM users',
        width: '500px',
    },
};
