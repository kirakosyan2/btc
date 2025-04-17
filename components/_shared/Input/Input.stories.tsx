import type { Meta, StoryObj } from '@storybook/react';
import { UIInput } from './Input';

const meta = {
    title: 'Example/Input',
    component: UIInput,
    parameters: {
        layout: 'centered',
    },
    args: {
        placeholder: 'Введите текст...',
        disabled: false,
        size: 'middle',
        value: '',
        variant: 'outlined',
        status: '',
        allowClear: false,
    },
    argTypes: {
        placeholder: { control: 'text' },
        disabled: { control: 'boolean' },
        size: { control: 'select', options: ['middle', 'large', 'small'] },
        value: { control: 'text' },
        variant: { control: 'select', options: ["outlined", "borderless", "filled"] },
        status: { control: 'select', options: ["default", "warning", "error"] },
        allowClear: { control: 'boolean' }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof UIInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
