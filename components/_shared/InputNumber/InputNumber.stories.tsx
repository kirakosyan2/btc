import type { Meta, StoryObj } from '@storybook/react';
import { UIInputNumber } from './InputNumber'

const meta = {
    title: 'Example/InputNumber',
    component: UIInputNumber,
    parameters: {
        layout: 'centered',
    },
    args: {
        placeholder: 'Введите число...',
        min: 0,
        max: 100,
        step: 1,
        disabled: false,
    },
    argTypes: {
        placeholder: { control: 'text' },
        min: { control: 'number' },
        max: { control: 'number' },
        step: { control: 'number' },
        size: {
            control: 'select',
            options: ['middle', 'small', 'large'],
        },
        disabled: { control: 'boolean' },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof UIInputNumber>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
