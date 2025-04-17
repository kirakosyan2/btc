import type { Meta, StoryObj } from '@storybook/react';
import { UIFloatButton } from './FloatButton';


const meta = {
    title: 'Example/FloatButton',
    component: UIFloatButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        type: 'default',
        shape: 'circle',
        tooltip: 'Подсказка',
        htmlType: 'button',
        badge: {
            count: 0
        },
        href: '#',
        style: {
            position: 'absolute',
            bottom: '-10px'
        }
    },
    argTypes: {
        type: {
            control: 'select',
            options: ['default', 'primary'],
        },
        shape: {
            control: 'select',
            options: ['circle', 'square'],
        },
        tooltip: { control: 'text' },
        href: { control: 'text' },
        target: {
            control: 'select',
            options: ['_self', '_blank', '_parent', '_top'],
        },
        htmlType: {
            control: 'select',
            options: ['submit', 'reset', 'button'],
        },
        badge: { control: 'object' },
    },
} satisfies Meta<typeof UIFloatButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Danger: Story = {
    args: {
        type: 'primary',
    },
};

export const WithIcon: Story = {
    args: {
        icon: '🔍',
    },
};

export const WithTooltip: Story = {
    args: {
        tooltip: 'Это подсказка для кнопки',
    },
};

export const WithBadge: Story = {
    args: {
        badge: {
            count: 5,
        },
    },
};