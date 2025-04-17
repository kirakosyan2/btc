import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta = {
    title: 'Example/Icon',
    component: Icon,
    parameters: {
        layout: 'centered',
    },
    args: {
        type: 'login-outlined',
        size: 'md',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
