import type { Meta, StoryObj } from '@storybook/react';
import { UIButton } from './Button';

const meta = {
    title: 'Example/Button',
    component: UIButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        disabled: false,
        size: 'middle',
        type: 'default',
        children: 'Button'
    },
    argTypes: {
        size: {
            control: 'select', options: ['small', 'middle', 'large'],
        },
        type: {
            control: 'select', options: ["link", "text", "default", "primary", "dashed"],
        },
        disabled: { control: 'boolean' },
        children: { control: 'text' }
    },
} satisfies Meta<typeof UIButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};