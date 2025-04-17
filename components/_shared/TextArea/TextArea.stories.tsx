import type { Meta, StoryObj } from '@storybook/react';
import { UITextArea } from './TextArea';

const meta = {
    title: 'Example/TextArea',
    component: UITextArea,
    parameters: {
        layout: 'centered',
    },
    args: {
        placeholder: 'Введите текст...',
        rows: 4,
        disabled: false,
        autoSize: false,
        status: '',
        maxLength: 100
    },
    argTypes: {
        rows: { control: 'number' },
        disabled: { control: 'boolean' },
        autoSize: { control: 'boolean' },
        status: { control: 'select', options: ['default', 'error', 'warning'] },
        style: { control: 'object' },
        maxLength: { control: 'number' },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof UITextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'Введите текст...',
        rows: 4,
    },
};
