import type { Meta, StoryObj } from '@storybook/react';
import { UIInputPassword } from './InputPassword'

const meta = {
    title: 'Example/InputPassword',
    component: UIInputPassword,
    parameters: {
        layout: 'centered',
    },
    args: {
        placeholder: 'Введите пароль...',
        size: 'middle',
        disabled: false,
        status: '',
    },
    argTypes: {
        status: { control: 'select', options: ["default", "warning", "error"] },
        size: { control: 'select', options: ['small', 'middle', 'large'] },
        disabled: { control: 'boolean' },
        placeholder: { control: 'text' },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof UIInputPassword>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {}